import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Context } from "..";
import { fetchCathedras } from "../http/cathedraApi";
import { fetchContracts } from "../http/ContractApi";
import { fetchCourseByNumber } from "../http/courseApi";
import { fetchYear } from "../http/YearApi";
import trash from "./../imgs/trash_icon.svg";
import axios from "axios";
import { saveAs } from "file-saver";

const Dogovor1 = observer(() => {
  const { cathedra } = useContext(Context);

  const [course, setCourse] = useState({});
  const [courseName, setCourseName] = useState("");
  const [yearText, setYearText] = useState({});
  const [users, setUsers] = useState([]);
  const [cath, setCath] = useState("");
  const [fullDate, setFullDate] = useState("");
  const [firstDate, setFirstDate] = useState("");

  const [dogovor, setDogovor] = useState([]);
  const [nameUsers, setNameUsers] = useState([]);

  useEffect(() => {
    fetchYear().then((data) => setYearText(data[0].name));
    fetchCathedras().then(data => cathedra.setCathedras(data));
  }, []);

  useEffect(() => {
    if (course.id) {
      fetchContracts({ courseId: course.id }).then((data) => {
        setUsers(data);
      });
    }
  }, [course])

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < users.length; i++) {
      arr.push(users[i].fullname);
    }
    setNameUsers(arr);

  }, [users])

  useEffect(() => {
    if (course.date) {
      let dates = course.date.split("-");
      dates = dates.map(function (el) {
        return el + `.${yearText}`;
      });
      dates[0] = dates[0] + " по ";
      let res = dates.join("");
      setFullDate(res);
    } else {
      setFullDate('');
    }

    if (course.id) {
      fetchContracts({ courseId: course.id }).then((data) => {
        setUsers(data);
      });
    }

    setCourseName(course.name);
  }, [course]);

  useEffect(() => {
    if (fullDate) {
      let dates = fullDate.split(" по ");
      setFirstDate(dates[0]);
    } else {
      setFirstDate('');
    }
  }, [fullDate])

  function addCour() {
    if (course.id) {
      setDogovor([
        ...dogovor,
        {
          num: course.number,
          name: course.name,
          firstDate: firstDate,
          users: nameUsers,
          cath: "",
          date: fullDate,
          cathName: "",
        },
      ]);
      setFirstDate("");
    }
  }

  function updateCourse(number) {
    let empty = number === '';
    let isInteger = !isNaN(+number);
    if (!empty && isInteger) {
      fetchCourseByNumber(number)
        .then((data) => {
          if (data !== null) {
            setCourse(data);
          } else {
            setCourse({});
          }
        });
    }
  }

  function deleteCour(num) {
    setDogovor(dogovor.filter((cour) => cour.num != num));
  }

  function editFunc(e, num) {
    setDogovor([
      ...dogovor.map((dog) =>
        dog.num === num ? { ...dog, cath: e.target.value } : { ...dog }
      )
    ])
    setCath(e.target.value);
  }


  useEffect(() => {
    cathedra.cathedras.forEach((cas) => {
      if (cas.name == cath && cas.zav_name) {

        let name = cas.zav_name.split(' ');
        name = name[name.length - 1];
        let res = name.split('.');
        let resName = res[2] + ' ' + res[0] + '.' + res[1] + '.';

        setDogovor([
          ...dogovor.map((dog) =>
            dog.cath === cas.name ? { ...dog, cathName: resName } : { ...dog }
          )
        ])
      }
    });

  }, [cath])


  function createDog() {
    if (dogovor.length > 0) {
      axios
        .post(process.env.REACT_APP_HOST + "/create-dogovor1", { arr: dogovor })
        .then(() =>
          axios.get(process.env.REACT_APP_HOST + "/create-dogovor1", { responseType: "blob" })
        )
        .then((res) => {
          const docxBlob = new Blob([res.data], { type: "application/docx" });
          saveAs(docxBlob, `dogovorTest.docx`);
        });
    } else {
      alert('Добавьте курсы в приказ!');
    }
  }


  return (
    <div className="dogCard">
      <p
        style={{ fontFamily: "Roboto", fontSize: "18px" }}
      >
        Введите номер курса, который хотите добавить в приказ о зачислении на
        повышение квалификации:
      </p>

      <div style={{ marginTop: "2rem" }}>
        <Row>
          <Col md={10}>
            <input
              onChange={(e) => updateCourse(e.target.value)}
              className="cusInput"
              type="number"
              placeholder="Введите №ПК..."
            />
          </Col>
          <Col md={2}>
            <Button
              onClick={addCour}
              style={{ marginTop: "3px", width: "100%" }}
              variant="success"
            >
              Добавить
            </Button>
          </Col>
        </Row>
        {courseName}
      </div>

      <div style={{ marginTop: "4rem" }} className="coursHeader">
        <Row>
          <Col md={2} lg={2}>
            №PK
          </Col>
          <Col md={3} lg={3}></Col>
          <Col md={6} lg={6}>
            Кафедра
          </Col>
          <Col md={1} lg={1}></Col>
        </Row>
      </div>

      {dogovor.map((dog) => (
        <div className="coursItem" key={dog.num}>
          <Row>
            <Col style={{ fontSize: "22px" }} md={2}>
              {dog.num}
            </Col>
            <Col md={3} lg={3}></Col>
            <Col md={6}>
              <select
                // value={dogovor.cath}
                onChange={(e) => editFunc(e, dog.num)}
                style={{ marginTop: '0', marginBottom: '0' }}
                name="select"
                className="select"
              >
                <option value="">Выберите кафедру...</option>
                {cathedra.cathedras.map(cath =>
                  <option key={cath.id} value={cath.name}>
                    {cath.name}
                  </option>
                )}
              </select>
            </Col>
            <Col md={1}>
              <img
                onClick={() => deleteCour(dog.num)}
                style={{ height: "30px", cursor: "pointer" }}
                src={trash}
                alt=""
              />
            </Col>
          </Row>
        </div>
      ))}

      <Button className="print_button" onClick={createDog} variant="success" >
        Печать
      </Button>

    </div>
  );
});

export default Dogovor1;