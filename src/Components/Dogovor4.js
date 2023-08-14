import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { fetchContracts } from "../http/ContractApi";
import { fetchCourseByNumber } from "../http/courseApi";
import { fetchYear } from "../http/YearApi";
import trash from "./../imgs/trash_icon.svg";
import axios from "axios";
import { saveAs } from "file-saver";

const Dogovor4 = observer(() => {
  const [course, setCourse] = useState({});
  const [courseName, setCourseName] = useState("");
  const [yearText, setYearText] = useState({});
  const [users, setUsers] = useState([]);
  const [lastDate, setLastDate] = useState("");

  const [dogovor, setDogovor] = useState('');

  useEffect(() => {
    fetchYear().then((data) => setYearText(data[0].name));
  }, []);

  useEffect(() => {
    if (course.id) {
      fetchContracts({ courseId: course.id }).then((data) => {
        setUsers(data);
      });
    }

    if (course.date) {
      let dates = course.date.split("-");
      dates = dates.map(function (el) {
        return el + `.${yearText}`;
      });
      setLastDate(dates[1]);
    } else {
      setLastDate('');
    }

    setCourseName(course.name);
  }, [course])

  function addCour() {
    if (course.id) {
      setDogovor(
        {
          num: course.number,
          name: course.name,
          lastDate: lastDate,
          arr: users,
        },
      );
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

  function createDog() {
    if (dogovor) {
      axios
        .post(process.env.REACT_APP_HOST + "/create-dogovor4", dogovor)
        .then(() =>
          axios.get(process.env.REACT_APP_HOST + "/create-dogovor4", { responseType: "blob" })
        )
        .then((res) => {
          const docxBlob = new Blob([res.data], { type: "application/docx" });
          saveAs(docxBlob, `dogovorTest4.docx`);
        });
    } else {
      alert('Введите номер курса!');
    }
  }

  return (
    <div className="dogCard">
      <p
        style={{ fontFamily: "Roboto", fontSize: "18px" }}
      >
        Введите номер курса, который хотите добавить в зачётно-экзаменационную ведомость:
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

      {dogovor
        ? <div style={{ backgroundColor: 'white' }} className="coursItem">
          {dogovor.num}
        </div>
        : <></>
      }


      <Button className="print_button" onClick={createDog} variant="success" >
        Печать
      </Button>

    </div>
  );
});

export default Dogovor4;