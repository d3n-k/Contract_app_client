import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { createCourse } from "../http/courseApi";
import { fetchCourseTypes, fetchOneCourseType } from "../http/courseTypeApi";

function CourseModal({ setVisible }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState('');
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [select, setSelect] = useState('');
  const [courseTypes, setCourseTypes] = useState(['Тип']);

  useEffect(() => {
    fetchCourseTypes().then((data) => {
      setCourseTypes(data);
    });
  }, []);

  const addCourse = () => {
    const re = /^\d+,\d+$/;
    if (re.test(String(price).toLowerCase()) || price === '') {
      createCourse({ number: number, name: name, price: price, date: date, type: select}).then(
        (data) => {
          setName("");
          setNumber('');
          setPrice("");
          setDate("");
          setSelect(0);
          setVisible(false);
          window.location.reload();
        }
      );
    } else {
      alert('Цена не соответствует формату');
    }
  };


  return (
    <div>
      <h3 style={{ textAlign: "center", marginTop: "2rem" }}>Добавить курс</h3>
      <div className="cath_modal">
        <input
          onChange={(e) => setNumber(e.target.value)}
          value={number}
          type="number"
          placeholder="Введите №ПК..."
        />
        <select
          value={select}
          onChange={(e) => setSelect(e.target.value)}
          name="select"
          className="select_course">
          <option value="0" style={{ margin: '5rem' }}>Тип образовательной программы</option>
          {courseTypes.map((type) => (
            <option value={type.id} style={{ margin: '5rem' }}>{type.name}</option>
          ))}
        </select>
        <textarea
          className="text_edit"
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Введите название курса ..."
        />
        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          type="text"
          placeholder="Введите стоимость..."
        />
        <input
          onChange={(e) => setDate(e.target.value.split(' ').join(''))}
          value={date}
          type="text"
          placeholder="Введите даты начала и окончания..."
        />
      </div>
      <div style={{ marginTop: "5rem" }}>
        <Button variant="secondary" onClick={() => setVisible(false)}>
          Отменить
        </Button>
        <Button
          onClick={addCourse}
          style={{ marginLeft: "5px" }}
          variant="success"
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
}

export default CourseModal;
