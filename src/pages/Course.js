import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Context } from "..";
import AdminNavbar from "../Components/AdminNavbar";
import { observer } from "mobx-react-lite";
import trash from "./../imgs/trash_icon.svg";
import edit from "./../imgs/edit_icon.svg";
import { Button } from "react-bootstrap";
import MyModal from "../UI/MyModal/MyModal";
import CourseModal from "../Components/CourseModal";
import { fetchCourses, fetchOneCourse, deleteCourse } from "../http/courseApi";
import EditCourseModal from "../Components/EditCourseModal";
import Pages from "../Components/Pages";
import { fetchYear, updateYear } from "../http/YearApi";

const Course = observer(() => {
  const [ courseEdit, setCourseEdit] = useState({});
  const [modall, setModall] = useState(false);
  const [editt, setEditt] = useState(false);

  const [yearText, setYearText] = useState({});

  const { course } = useContext(Context);
  const { year } = useContext(Context);

  function deleteC(id) {
    deleteCourse(id).then((data) => {
      window.location.reload();
    });
  }

  useEffect(() => {
    fetchCourses(1, 15).then((data) => {
      course.setCourses(
        data.rows.sort((a, b) => (a.number > b.number ? 1 : -1))
      );
      course.setTotalCount(data.count);
    });
    fetchYear().then((data) => setYearText(data[0]));
  }, []);

  useEffect(() => {
    fetchCourses(course.page, 15).then((data) => {
      course.setCourses(
        data.rows.sort((a, b) => (a.number > b.number ? 1 : -1))
      );
      course.setTotalCount(data.count);
    });
  }, [course.page]);

  function editFunc(cours) {
    setEditt(true);
    setCourseEdit(cours);
    //fetchOneCourse(id).then((data) => setCourseEdit(data));
  }

  const updateYr = () => {
    updateYear(yearText.id, yearText).then(
      (data) => {
        window.location.reload();
      }
    );
  };

  return (
    <div style={{ marginBottom: "4rem" }}>
      <AdminNavbar />
      <Container style={{ marginTop: "7rem" }}>
        <MyModal visible={modall} setVisible={setModall}>
          <CourseModal setVisible={setModall} />
        </MyModal>

        <MyModal visible={editt} setVisible={setEditt}>
          <EditCourseModal
            setCourseEdit={setCourseEdit}
            courseEdit={courseEdit}
            setVisible={setEditt}
          />
        </MyModal>

        <div>
          <Row>
            <Col md={10}>
              <h2 style={{ marginLeft: "1rem" }}>Редактор базы ФПК</h2>
            </Col>
            <Col md={2}>
              <Button
                onClick={() => setModall(true)}
                style={{ marginLeft: "2rem" }}
                variant="success"
              >
                {" "}
                Добавить курс{" "}
              </Button>
            </Col>
          </Row>
        </div>

        <div style={{ display: "flex", marginTop: "1rem"}}>
          <p
            style={{
              marginBottom: "0rem",
              fontFamily: "Roboto",
              fontSize: "18px",
              marginLeft: "1rem",
              marginTop: '5px'
            }}
          >
            Выбрать год проведения курсов:
          </p>
          <input
          value={yearText.name || ''}
          onChange={(e) => setYearText({...yearText, name: e.target.value})}
            className="yearInput"
            style={{ marginLeft: "1rem"}}
            type="text"
          />
          <Button onClick={updateYr} style={{ marginLeft: '2px'}} variant="success" >Сохранить</Button>
        </div>

        <div style={{ marginTop: "4rem" }} className="coursHeader">
          <Row>
            <Col md={1} lg={1}>
              №PK
            </Col>
            <Col md={6} lg={6} style={{ marginLeft: "0.5rem" }}>
              Название
            </Col>
            <Col md={2} lg={1} style={{ marginLeft: "-1.5rem" }}>
              Стоимость
            </Col>
            <Col md={1} lg={2} style={{ marginLeft: "1.5rem" }}>
              Даты
            </Col>
            <Col md={1} lg={1}></Col>
            <Col md={1} lg={1}></Col>
          </Row>
        </div>

        {course.courses.map((cours) => (
          <div className="coursItem" key={cours.id}>
            <Row>
              <Col style={{ fontSize: "20px" }} md={1}>
                {cours.number}
              </Col>
              <Col md={6}>{cours.name}</Col>
              <Col style={{ fontSize: "20px" }} md={1}>
                {cours.price}
              </Col>
              <Col md={2}>{cours.date}</Col>
              <Col md={1}>
                <img
                  onClick={() => editFunc(cours)}
                  style={{ height: "27px", cursor: "pointer" }}
                  src={edit}
                  alt=""
                />
              </Col>
              <Col md={1}>
                <img
                  onClick={() => deleteC(cours.id)}
                  style={{ height: "30px", cursor: "pointer" }}
                  src={trash}
                  alt=""
                />
              </Col>
            </Row>
          </div>
        ))}
        <Pages />
      </Container>
    </div>
  );
});

export default Course;
