import { useState, useContext, useEffect } from "react";
import details1 from "./../imgs/contract1_details_1.jpg";
import details2 from "./../imgs/contract1_details_2.jpg";
import { Button, Container, Row, Col } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { saveAs } from "file-saver";
import { Context } from "..";
import { fetchCourseByNumber } from "../http/courseApi";
import axios from "axios";
import translate from 'translate';
import { fetchYear } from "../http/YearApi";
import { createContract } from "../http/ContractApi";
import { da, yet } from "../functions/dateFunc";
import { fetchCourseTypes } from "../http/courseTypeApi";

const ContractModal3 = observer(({ setVisible, setLoading }) => {
  const [formValid, setFormValid] = useState(false);
  const [checked, setChecked] = useState(true);
  const [courseTypes, setCourseTypes] = useState(['Тип1', 'Тип2']);

  const [serNumberError, setSerNumberError] = useState(false);
  const [dirNumberError, setDirNumberError] = useState(false);
  const [fullNameError, setFullNameError] = useState(false);

  const [course, setCourse] = useState({});
  const [courseName, setCourseName] = useState("");
  const [newDate, setNewDate] = useState('');

  const [img, setImg] = useState(false);
  const [img2, setImg2] = useState(false);

  const [pdf, setPdf] = useState({
    serialNamber: "",
    directionNamber: "",
    fullName: "",
    address: `___________________________
              ___________________________
              ___________________________`,
    mobilePhone: "___________________________",
    homePhone: "___________________________",
    organName:
      "____________________________________________________________________________________",
    organAddress: `____________________________
                   ____________________________`,
    mainPosition: "_______________________",
    charter: "_______________________",
  });

  const [yearText, setYearText] = useState({});
  const [time, setTime] = useState('');

  translate.engine = "google";
  translate.key = process.env.GOOGLE_KEY;

  useEffect(() => {
    if (!checked || serNumberError || dirNumberError || fullNameError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [checked, serNumberError, dirNumberError, fullNameError])

  useEffect(() => {
    fetchCourseTypes().then((data) => setCourseTypes(data));
    fetchYear().then((data) => setYearText(data[0].name));
  }, []);

  useEffect(() => {
    setNewDate(`___.___.${yearText.name} по ___.___.${yearText.name}`);
  }, [yearText]);

  useEffect(() => {
    if (course.date) {
      let dates = course.date.split("-");
      dates = dates.map(function (el) {
        return el + `.${yearText}`;
      });
      dates[0] = dates[0] + " по ";
      let res = dates.join("");
      setNewDate(res);
    } else {
      setNewDate('');
    }
    setCourseName(course.name);
  }, [course]);

  function clickDetails1() {
    if (img) {
      setImg(false);
    } else {
      setImg(true);
    }
  }

  function clickDetails2() {
    if (img2) {
      setImg2(false);
    } else {
      setImg2(true);
    }
  }

  function createAndDownloadPdf() {
    const server = {
      ...pdf,
      cour: course.name,
      date: newDate,
      type: getCourseType(course),
      price: course.price,
      year: yearText
    };
    //if (yet(time) === 'go') {
      setLoading(true);
      axios
        .post(process.env.REACT_APP_HOST + "/create-pdf3", server)
        .then(() =>
          axios.get(process.env.REACT_APP_HOST + "/contract3", { responseType: "blob" })
        )
        .then((res) => {
          const pdfBlob = new Blob([res.data], { type: "application/pdf" });
          const text = translate(pdf.fullName, { from: 'ru', to: "en" });
          text.then(data => {
            data = data.split(' ').join('_');
            saveAs(pdfBlob, `BGMU_Dogovor_${data}.pdf`);
            createContract({ fullname: server.fullName, courseId: course.id, naprav: server.directionNamber }).then((data) => { });
          })

        }).finally(() => setLoading(false));
      setVisible(false);
    // } else if (yet(time) === 'forbidden') {
    //   alert('Курс уже начался!');
    // } else {
    //   alert('Регистрация на курс начнётся за две недели до начала!');
    // }
  }

  const getCourseType = (course) => {
    return (course.type ? courseTypes[course.type - 1] : courseTypes[1]).name_r;
  }

  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setPdf({ ...pdf, [name]: value });
    if (name === "serialNamber") {
      updateCourse(value);
    }
    checkFieldError(e);
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
      setSerNumberError(false);
    }
  }

  useEffect(() => {
    setTime(da(newDate));
  }, [newDate])

  const blurHandler = (e) => {
    checkFieldError(e);
  };

  function checkFieldError(e) {
    let text = e.target.value;
    let empty = text === '';
    let isInteger = !isNaN(+text);
    switch (e.target.name) {
      case "serialNamber":
        setSerNumberError(empty || !isInteger);
        break;
      case "directionNamber":
        setDirNumberError(empty || !isInteger);
        break;
      case "fullName":
        setFullNameError(empty);
        break;
    }
  }

  let errorText = 'Заполните это поле!';

  return (
    <div>
      <h5 className="modal1_title">
        Повышение квалификации специалиста на платной основе
      </h5>
      <div className="hr"></div>
      <div>
        <p className="modal1_p">
          Порядковый номер образовательной программы в соответствии со Сводным
          планом повышения квалификации и переподготовки руководящих работников
          и специалистов здравоохранения Республики Беларусь.
        </p>
        <div
          onClick={clickDetails1}
          className={img ? "details_1_active" : "details_1"}
        >
          Детали
        </div>
        <img
          className={img ? "modal1_img_active" : "modal1_img"}
          src={details1}
          alt=""
        />

        <div>
          <input
            onBlur={(e) => blurHandler(e)}
            onWheel={(e) => e.target.blur()}
            name="serialNamber"
            onChange={handleChange}
            type="number"
            placeholder="Введите порядковый номер..."
            className="modal1_input"
          />
          {courseName}
        </div>
        {serNumberError && (
            <div style={{ marginBottom: "-1rem", color: "red" }}>{errorText}</div>
          )}
      </div>
      <div className="hr"></div>
      <div>
        <p style={{ paddingTop: "1rem" }} className="modal1_p">
          Номер направления(См.подробнее)
        </p>
        <div
          onClick={clickDetails2}
          className={img2 ? "details_2_active" : "details_2"}
        >
          Детали
        </div>

        <img
          className={img2 ? "modal1_img2_active" : "modal1_img2"}
          src={details2}
          alt=""
        />

        <div>
          <input
            onBlur={(e) => blurHandler(e)}
            onWheel={(e) => e.target.blur()}
            name="directionNamber"
            onChange={handleChange}
            type="number"
            placeholder="Введите номер направления..."
            className="modal1_input"
          />
          {dirNumberError && (
            <div style={{ marginBottom: "-1rem", color: "red" }}>{errorText}</div>
          )}
        </div>
      </div>
      <div className="hr"></div>
      <div>
        <input
          onBlur={(e) => blurHandler(e)}
          name="fullName"
          onChange={handleChange}
          placeholder="Фамилия, собственное имя, отчество..."
          className="modal1_input"
          type="text"
        />
        {fullNameError && (
          <div style={{ marginBottom: "-0.5rem", color: "red" }}>{errorText}</div>
        )}
      </div>
      <div>
        <input
          name="address"
          onChange={handleChange}
          placeholder="Адрес слушателя..."
          className="modal1_input"
          type="text"
        />
      </div>
      <div className="hr"></div>
      <p className="modal1_p">Мобильный номер телефона слушателя</p>
      <div>
        <input
          name="mobilePhone"
          onChange={handleChange}
          placeholder="Формат ввода: +375 99 999-99-99"
          className="modal1_input"
          type="text"
        />
      </div>
      <p className="modal1_p">Домашний номер телефона слушателя</p>
      <div>
        <input
          name="homePhone"
          onChange={handleChange}
          placeholder="Формат ввода: 999-99-99"
          className="modal1_input"
          type="text"
        />
      </div>
      <div className="hr"></div>
      <div>
        <p className="modal1_p">
          Полное наименование организации, имеющей потребность в повышении
          квалификации специалиста.
        </p>
        <p style={{ fontFamily: "Roboto" }} className="modal1_p">
          Примеры:
        </p>
        <p style={{ fontFamily: "Roboto" }} className="modal1_p">
          Учреждение здравоохранения «Городская клиническая больница скорой
          медицинской помощи» г. Минска;
        </p>
        <p style={{ fontFamily: "Roboto" }} className="modal1_p">
          Государственное учреждение «Республиканский научно-практический центр
          онкологии и медицинской радиологии им. Н.Н.Александрова»
        </p>
      </div>
      <div>
        <input
          name="organName"
          onChange={handleChange}
          placeholder="Введите наименование организации..."
          className="modal1_input"
          type="text"
        />
      </div>
      <div className="hr"></div>
      <p className="modal1_p">
        Местонахождение организации с указанием почтовых индекса и адреса
      </p>
      <div>
        <input
          name="organAddress"
          onChange={handleChange}
          placeholder="Введите местонахождение организации..."
          className="modal1_input"
          type="text"
        />
      </div>
      <div className="hr"></div>
      <div>
        <p className="modal1_p">
          Должность, фамилия и инициалы лица, на которое возложено заключение
          договора в родительном падеже.
        </p>
        <p style={{ fontFamily: "Roboto" }} className="modal1_p">
          Примеры:
        </p>
        <p style={{ fontFamily: "Roboto" }} className="modal1_p">
          Главного врача, директора, или лица, исполняющего их обязанности, в
          установленном порядке
        </p>
      </div>
      <div>
        <input
          name="mainPosition"
          onChange={handleChange}
          placeholder="Должность, ФИО в родительном падеже..."
          className="modal1_input"
          type="text"
        />
      </div>
      <div className="hr"></div>
      <div>
        <p className="modal1_p">
          Основания для заключения договора в родительном падеже(устава,
          договора или доверенности, дата и номер утверждения, выдачи,
          регистрации)
        </p>
        <p style={{ fontFamily: "Roboto" }} className="modal1_p">
          Примеры:
        </p>
        <p style={{ fontFamily: "Roboto" }} className="modal1_p">
          Устава от 01.01.2016 №1;
        </p>
      </div>
      <div>
        <input
          name="charter"
          onChange={handleChange}
          placeholder="Устав или доверенность, дата и номер утверждения, выдачи, регистрации в родительном падеже..."
          className="modal1_input"
          type="text"
        />
      </div>
      <div className="hr"></div>
      <div style={{ display: "flex" }}>
        <input id="check3" type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
        <label
          style={{
            marginLeft: "10px",
            marginTop: "-5px",
            fontFamily: "Roboto",
          }}
          htmlFor="check3"
        >
          Заполняя веб-форму и отправляя указанные в ней персональные данные, я
          выражаю свое согласие на обработку моих личных данных с целью
          обработки моего запроса и ответа на него.
        </label>
      </div>
      <div className="hr"></div>
      <Container>
        <Row>
          <Col sm={6} md={8} lg={9}></Col>
          <Col sm={6} md={4} lg={3}>
            <Button disabled={!formValid} onClick={createAndDownloadPdf} variant="success">
              Сохранить
            </Button>
            <Button
              onClick={() => setVisible(false)}
              style={{ marginLeft: "0.5rem" }}
              variant="secondary"
            >
              Отменить
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
});

export default ContractModal3;
