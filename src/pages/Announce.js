import { observer } from "mobx-react-lite";
import { Container, Button } from "react-bootstrap";
import AdminNavbar from "../Components/AdminNavbar";
import { useContext, useEffect, useState } from "react";
import { fetchAnnounce, updateAnnounce, createAnnounce } from "../http/AnnounceApi";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Announce = observer(() => {
  const [announce, setAnnounce] = useState({});
  const [announceId, setAnnounceId] = useState(null);

  useEffect(() => {
    fetchAnnounce().then((data) => {
      if (data.length > 0) {
        setAnnounce(data[0]);
        setAnnounceId(data[0].id);
      }
    })
  }, []);

  const updateAnn = () => {
    updateAnnounce(announce).then(
      (data) => {
        window.location.reload();
      }
    );
  };

  const createAnn = () => {
    createAnnounce(announce).then(
      (data) => {
        setAnnounceId(data.id);
        window.location.reload();
      }
    );
  };


  return (
    <div style={{ marginBottom: "4rem" }}>
      <AdminNavbar />
      <Container style={{ marginTop: "7rem" }}>
        <h2 style={{ textAlign: "center" }}>Добавить объявление</h2>
        <p
          style={{
            marginTop: "4rem",
            marginLeft: "20%",
            fontFamily: "Roboto",
            fontSize: "18px",
          }}
        >
          Введите текст объявления, которое появится на странице регистрации:
        </p>

        <ReactQuill className="texteditor" theme="snow" value={announce.name} onChange={(value) => setAnnounce({ ...announce, name: value })} />

        <div>
          <Button onClick={() => {
            if (announceId === null)
              createAnn();
            else
              updateAnn();
          }} className="announ_button" variant="success">
            Сохранить
          </Button>
        </div>
      </Container>
    </div>
  );
});

export default Announce;
