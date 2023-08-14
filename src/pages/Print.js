import { observer } from "mobx-react-lite";
import { useState, useContext, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import AdminNavbar from "../Components/AdminNavbar";
import { Context } from "..";
import { fetchCathedras } from "../http/cathedraApi";
import { fetchCustomers, createCustomer } from "../http/CustomerApi";
import axios from "axios";
import { saveAs } from "file-saver";
import { fetchAllCourses } from "../http/courseApi";
import translate from 'translate';
import { fetchYear } from "../http/YearApi";
import { createJournal } from "../http/JournalApi";

const Print = observer(() => {
  const [select, setSelect] = useState("");
  const [cathValue, setCathValue] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [address, setAddress] = useState("");
  const [cusValue, setCusValue] = useState("");
  const [firstNum, setFirstNum] = useState("");
  const [firstNaprav, setFirstNaprav] = useState("");
  const [colNaprav, setColNaprav] = useState("");
  const [telephone, setTelephone] = useState("");
  const [cour, setCour] = useState("");
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');

  const [formValid, setFormValid] = useState(false);

  const [selectError, setSelectError] = useState(false);
  const [cathValueError, setCathValueError] = useState(false);
  const [firstNumError, setFirstNumError] = useState(false);
  const [firstNapravError, setFirstNapravError] = useState(false);
  const [colNapravError, setColNapravError] = useState(false);
  const [id, setId] = useState('');
  const [colvo, setColvo] = useState('');

  const { cathedra } = useContext(Context);
  const { customer } = useContext(Context);
  const { course } = useContext(Context);
  const { year } = useContext(Context);

  const [yearText, setYearText] = useState({});

  translate.engine = "google"; 
  translate.key = process.env.GOOGLE_KEY;

  const [toogleState, setToogleState] = useState(0); 

  const toogleTab = (index) => {
    setToogleState(index);      
  }


  useEffect(() => {
    fetchCathedras().then((data) => cathedra.setCathedras(data));
    fetchYear().then((data) => setYearText(data[0].name));
  }, []);

  useEffect(() => {
    fetchCustomers().then((data) => customer.setCustomers(data));
  }, []);

  useEffect(() => {
    fetchAllCourses().then((data) => course.setAllCourses(data));
  }, []);

  useEffect(() => {
    course.allCourses.forEach((cours) => {
      if (cours.number == firstNum) {
        setCour(cours.name);
        setDate(cours.date);
        setPrice(cours.price);
        setId(cours.id);
      }
    });
  }, [firstNum]);

  useEffect( () => {
      if (colNaprav == 1) {
        setColvo(`${firstNaprav}`);
      } else {
        let lastNaprav = Number(firstNaprav) + Number(colNaprav) - 1;
        setColvo(`${firstNaprav}-${lastNaprav}`);
      }
  }, [firstNaprav, colNaprav])

  useEffect(() => {
    if(cathValueError || colNapravError || firstNumError || firstNapravError || selectError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [cathValueError, colNapravError, firstNumError, firstNapravError, selectError]);

  const filteredCath = cathedra.cathedras.filter((cath) => {
    return cath.name.toLowerCase().includes(cathValue.toLowerCase());
  });

  const filteredCustomers = customer.customers.filter((cus) => {
    return cus.name.toLowerCase().includes(cusValue.toLowerCase());
  });

  function autocompleteItemHandler(e) {
    setCathValue(e.target.textContent);
    setIsOpen(!isOpen);
  }

  function cusLiHandler(e) {
    setCusValue(e.target.textContent);
    setIsOpen2(!isOpen2);
  }

  useEffect(() => {
    cathedra.cathedras.forEach((cath) => {
      if (cath.name == cathValue) {
        setAddress(cath.address);
        setTelephone(cath.telephone);
      }
    });
  }, [cathValue]);

  function PrintNaprav() {

    if (customer.customers.filter((obj) => obj.name === cusValue).length == 0) {
      createCustomer({ name: cusValue }).then((data) => {});
    }

    const Data = {
      cath: cathValue,
      address: address,
      cus: cusValue,
      firstNum: firstNum,
      firstNaprav: firstNaprav,
      colNaprav: colNaprav,
      telephone: telephone,
      cour: cour,
      date: date,
      price: price,
      year: yearText,
    };

    if (select == 'Бесплатное') {
      axios
      .post(process.env.REACT_APP_HOST + "/create-docx", Data)
      .then(() =>
        axios.get(process.env.REACT_APP_HOST + "/docx", { responseType: "blob" })
      )
      .then((res) => {
        const docxBlob = new Blob([res.data], { type: "application/docx" });
        const text = translate(cusValue, { from : 'ru', to : "en"  });
        text.then(data => {
          data = data.split(' ').join('_');
          saveAs(docxBlob, `napravlenie_${data}.docx`);
          createJournal({ organ: cusValue, colvo: colNaprav, courseId: id, numbers: colvo }).then((data) => {});
        });
      });
    } else if (select == 'Платное_физ') {
      axios
      .post(process.env.REACT_APP_HOST + "/create-docx2", Data)
      .then(() =>
        axios.get(process.env.REACT_APP_HOST + "/docx2", { responseType: "blob" })
      )
      .then((res) => {
        const docxBlob2 = new Blob([res.data], { type: "application/docx" });
        const text = translate(cusValue, { from : 'ru', to : "en"  });
        text.then(data => {
          data = data.split(' ').join('_');
          saveAs(docxBlob2, `napravlenie_${data}.docx`);
          createJournal({ organ: cusValue, colvo: colNaprav, courseId: id, numbers: colvo }).then((data) => {});
        });
      });
    } else {
      axios
      .post(process.env.REACT_APP_HOST + "/create-docx3", Data)
      .then(() =>
        axios.get(process.env.REACT_APP_HOST + "/docx3", { responseType: "blob" })
      )
      .then((res) => {
        const docxBlob3 = new Blob([res.data], { type: "application/docx" });
        const text = translate(cusValue, { from : 'ru', to : "en"  });
        text.then(data => {
          data = data.split(' ').join('_');
          saveAs(docxBlob3, `napravlenie_${data}.docx`);
          createJournal({ organ: cusValue, colvo: colNaprav, courseId: id, numbers: colvo }).then((data) => {});
        });
      });
    }
  }

  const blurHandler = (e) => {
    let isEmpty = e.target.value === "" || e.target.value === undefined;
    switch (e.target.name) {
      case "select":
        setSelectError(isEmpty);
        break;
      case "cath":
        setCathValueError(isEmpty);
        break;
      case "firstNum":
        setFirstNumError(isEmpty);
        break;
      case "firstNaprav":
        setFirstNapravError(isEmpty);
        break;
      case "colNaprav":
        setColNapravError(isEmpty);
        break;
    }
  };

  const changeHandler = (e) => {
    let value = e.target.value;
    let isEmpty = value === "" || value === undefined;
    switch (e.target.name) {
      case "select":
        setSelect(value);
        setSelectError(isEmpty);
        break;
      case "cath":
        setCathValue(value);
        setCathValueError(isEmpty);
        break;
      case "firstNum":
        setFirstNum(value);
        setFirstNumError(isEmpty);
        break;
      case "firstNaprav":
        setFirstNaprav(value);
        setFirstNapravError(isEmpty);
        break;
      case "colNaprav":
        setColNaprav(value);
        setColNapravError(isEmpty);
        break;
    }
  };

  let errorText = 'Заполните это поле!';

  return (
    <div style={{ marginBottom: "4rem" }}>
      <AdminNavbar />
      <Container>
        <h2 style={{ marginTop: "7rem", textAlign: "center" }}>
          Печать направлений
        </h2>
        <div className="select_div">
          <select
            onBlur={(e) => blurHandler(e)}
            name="select"
            onChange={(e) =>changeHandler(e)}
            value={select}
            className="select"
          >
            <option value="">Выберите тип направления</option>
            <option value="Бесплатное">Бесплатное</option>
            <option value="Платное_физ">Платное (физ. лицо)</option>
            <option value="Платное_юр">Платное (юр. лицо)</option>
          </select>

          {selectError  &&(
            <div style={{ marginTop: "-2rem", color: "red" }}>{errorText}</div>
          )}

          <div className="cath_input">
            <input
              onBlur={(e) => blurHandler(e)}
              name="cath"
              value={cathValue}
              onChange={(e) => changeHandler(e)}
              onClick={() => setIsOpen(true)}
              type="text"
              placeholder="Введите кафедру..."
            />
            <ul className="autocomplete">
              {cathValue && isOpen
                ? filteredCath.map((cath) => {
                    return (
                      <li
                        onClick={autocompleteItemHandler}
                        key={cath.id}
                        className="autocomplete_item"
                      >
                        {cath.name}
                      </li>
                    );
                  })
                : null}
            </ul>
            {cathValueError && (
              <div style={{ marginBottom: "-1.0rem", color: "red" }}>{errorText}</div>
            )}
          </div>

          {cathedra.cathedras.map((cath) => {
            if (cath.name == cathValue) {
              return (
                <div onClick={(e) => {
                  toogleTab(cath.id);
                  setAddress(e.target.textContent);
                }} className={
                  toogleState === cath.id
                  ? 'cath_address cath_address_active'
                  : 'cath_address'
                } key={cath.id}> 
                  {cath.address}
                </div>
              );
            }
          })}

          <div className="cus_input">
            <input
              value={cusValue}
              onChange={(e) => setCusValue(e.target.value)}
              onClick={() => setIsOpen2(true)}
              style={{ marginTop: "3rem" }}
              type="text"
              placeholder="Введите заказчика для выбора из базы или добавьте ФИО..."
            />
            <ul className="cus_ul">
              {cusValue && isOpen2
                ? filteredCustomers.map((cus) => {
                    return (
                      <li
                        onClick={cusLiHandler}
                        key={cus.id}
                        className="cus_li"
                      >
                        {cus.name}
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
          <input
            onBlur={(e) => blurHandler(e)}
            name="firstNum"
            value={firstNum}
            onChange={(e) => changeHandler(e)}
            type="number"
            placeholder="Порядковый номер образовательной программы..."
          />
          {course.allCourses.map((cours) => {
            if (cours.number == firstNum) {
              return <div key={cours.id}> {cours.name} </div>;
            }
          })}
          {firstNumError && (
            <div style={{ color: "red" }}>{errorText}</div>
          )}
          <input
            onBlur={(e) => blurHandler(e)}
            name="firstNaprav"
            value={firstNaprav}
            onChange={(e) => changeHandler(e)}
            style={{ marginTop: "3rem" }}
            type="number"
            placeholder="Первый номер направления..."
          />
          {firstNapravError && (
            <div style={{ color: "red" }}>{errorText}</div>
          )}
          <input
            onBlur={(e) => blurHandler(e)}
            name="colNaprav"
            value={colNaprav}
            onChange={(e) => changeHandler(e)}
            type="number"
            placeholder="Количество направлений..."
          />
          {colNapravError && (
            <div style={{ marginBottom: "-1.5rem", color: "red" }}>{errorText}</div>
          )}
        </div>
        <Button
          disabled={!formValid}
          onClick={PrintNaprav}
          className="print_button"
          variant="success"
        >
          Печать
        </Button>
      </Container>
    </div>
  );
});

export default Print;
