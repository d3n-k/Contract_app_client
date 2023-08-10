import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { fetchContracts } from "../http/ContractApi";
import { fetchCourseByNumber } from "../http/courseApi";
import { fetchYear } from "../http/YearApi";
import trash from "./../imgs/trash_icon.svg";
import axios from "axios";
import { saveAs } from "file-saver";

const Dogovor2 = observer(() => {

  const [course, setCourse] = useState({});
  const [courseName, setCourseName] = useState("");
  const [yearText, setYearText] = useState({});
  const [users, setUsers] = useState([]);
  const [lastDate, setLastDate] = useState("");

  const [dogovor, setDogovor] = useState([]);
  const [nameUsers, setNameUsers] = useState([]);

  useEffect(() => {
    fetchYear().then((data) => setYearText(data[0].name));
  }, []);

  useEffect( () => {
    if (course.date) {
      let dates = course.date.split("-");
      dates = dates.map(function (el) {
        return el + `.${yearText}`;
      });
      setLastDate(dates[1]);
    } else {
      setLastDate('');
    }

    if (course.id) {
      fetchContracts({ courseId: course.id }).then((data) => {
        setUsers(data);
      });
    }

    setCourseName(course.name);
  }, [course])

  useEffect( () => {
      const arr = [];
      for (let i = 0; i < users.length; i++) {
        arr.push(users[i].fullname);
      }
      setNameUsers(arr);
    
  }, [users])

  function addCour() {
    if (course.id) {
      setDogovor([
        ...dogovor,
        {
          num: course.number,
          name: course.name,
          lastDate: lastDate,
          users: nameUsers,
        },
      ]);
      setLastDate("");
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


  function createDog() {
    if (dogovor.length > 0) {
      axios
        .post(process.env.REACT_APP_HOST + "/create-dogovor2", {arr: dogovor})
        .then(() =>
          axios.get(process.env.REACT_APP_HOST + "/create-dogovor2", { responseType: "blob" })
        )
        .then((res) => {
          const docxBlob = new Blob([res.data], { type: "application/docx" });
          saveAs(docxBlob, `dogovorTest2.docx`);
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
          Введите номер курса, который хотите добавить в приказ о прекращении образовательных отношений:
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
        №PK
        </div>

        {dogovor.map((dog) => (
          <div className="coursItem" key={dog.num}>
            <Row>
              <Col style={{ fontSize: "22px" }} md={11}>
                {dog.num}
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

export default Dogovor2;