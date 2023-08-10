import { observer } from "mobx-react-lite";
import AdminNavbar from "../Components/AdminNavbar";
import { useContext, useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { Context } from "..";
import trash from "./../imgs/trash_icon.svg";
import { createAdmin, deleteAdmin, fetchAdmins } from "../http/AdminApi";
import { deleteUser, fetchUsers, loginFunc } from "../http/userApi";

const Admin = observer(() => {
  const { admin } = useContext(Context);
  const { user } = useContext(Context);
  const [login, setLogin] = useState("");

  useEffect(() => {
    fetchAdmins().then((data) => admin.setAdmins(data));
    fetchUsers().then((data) => user.setUsers(data));
  }, []);

  const addAdmin = () => {
    if (login) {
      createAdmin({ login: login }).then((data) => {
        setLogin("");
        window.location.reload();
      }).catch((e) => {
        alert(e.message);
      });
    }
  };

  function deleteAd(id, login) {
    // loginFunc("MaltsauSV@bsmu.by", "9576330109576$t").then((data) => {
    //   alert(data);
    // }).catch((e) => {
    //   alert(e.message);
    // });
    deleteAdmin(id).then((data) => {
      user.users.forEach((us) => {
        if (us.login === login + "@bsmu.by") {
          deleteUser(us.id).then((data) => {
            console.log("done");
          });
        }
      });
      window.location.reload();
    }).catch((e) => {
      alert(e.message);
    });
  }

  return (
    <div style={{ marginBottom: "4rem" }}>
      <AdminNavbar />
      <Container style={{ marginTop: "7rem" }}>
        <h2 style={{ textAlign: "center" }}>Добавить администратора</h2>
        <p
          style={{ marginTop: "4rem", fontFamily: "Roboto", fontSize: "18px" }}
        >
          После добавления в базу новый Администратор получит доступ в панель
          администрирования ФПК по логину и паролю к своему компьютеру.
        </p>

        <div style={{ marginTop: "2rem" }}>
          <Row>
            <Col md={10}>
              <input
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="cusInput"
                type="text"
                placeholder="Введите логин администратора..."
              />
            </Col>
            <Col md={2}>
              <Button
                onClick={addAdmin}
                style={{ marginTop: "3px", width: "100%" }}
                variant="success"
              >
                Добавить
              </Button>
            </Col>
          </Row>
        </div>

        <div className="admHead">
          <Row>
            <Col md={11}>Администраторы</Col>
            <Col md={1}></Col>
          </Row>
        </div>

        {admin.admins.map((adm) => (
          <div className="admItem" key={adm.id}>
            <Row>
              <Col md={11}>{adm.secret}</Col>
              <Col onClick={() => deleteAd(adm.id, adm.login)} md={1}>
                <img
                  style={{ height: "30px", cursor: "pointer" }}
                  src={trash}
                  alt=""
                />
              </Col>
            </Row>
          </div>
        ))}
      </Container>
    </div>
  );
});

export default Admin;
