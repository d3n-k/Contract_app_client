import { useContext, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Context } from "..";
import { updateCourse } from "../http/courseApi";
import { fetchCourseTypes, fetchOneCourseType } from "../http/courseTypeApi";

function EditCourseModal({ setVisible, setCourseEdit, courseEdit }) {
  const { course } = useContext(Context);
  const [courseTypes, setCourseTypes] = useState(['Тип']);

  useEffect(() => {
    fetchCourseTypes().then((data) => {
      setCourseTypes(data);
    });
  }, []);

 const updateCoursee = () => {
    const re = /^\d+,\d+$/;
    if(re.test(String(courseEdit.price).toLowerCase()) || courseEdit.price === '') {
      updateCourse(courseEdit.id, courseEdit).then(
        (data) => {
          setCourseEdit({});
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
      <h3 style={{ textAlign: "center", marginTop: "2rem" }}>
        Редактировать курс
      </h3>
      <div className="cath_modal">
        <input
          onChange={(e) => setCourseEdit({...courseEdit, number: e.target.value})}
          value={courseEdit.number || ''}
          type="number"
          placeholder="Введите №ПК..."
         
        />
        <select
          value={courseEdit.type || 0}
          onChange={(e) => setCourseEdit({...courseEdit, type: e.target.value})}
          name="select"
          className="select_course">
          <option value="0" style={{ margin: '5rem' }}>Тип образовательной программы</option>
          {courseTypes.map((type) => (
            <option value={type.id} style={{ margin: '5rem' }}>{type.name}</option>
          ))}
        </select>
        <textarea
         onChange={(e) => setCourseEdit({...courseEdit, name: e.target.value})}
          className="text_edit"
          value={courseEdit.name || ''}
          type="text"
          placeholder="Введите название курса ..."
          
        />
        <input
          onChange={(e) => setCourseEdit({...courseEdit, price: e.target.value})}
          value={courseEdit.price || ''}
          type="text"
          placeholder="Введите стоимость..."
         
        />
        <input
        onChange={(e) => setCourseEdit({...courseEdit, date: e.target.value.split(' ').join('')})}
         value={courseEdit.date || ''}
          type="text"
          placeholder="Введите даты начала и окончания..."
         
        />
      </div>
      <div style={{ marginTop: "5rem" }}>
        <Button variant="secondary" onClick={() => setVisible(false)}>
          Отменить
        </Button>
        <Button onClick={updateCoursee} style={{ marginLeft: "5px" }} variant="success">
          Сохранить
        </Button>
      </div>
    </div>
  );
}

export default EditCourseModal;
