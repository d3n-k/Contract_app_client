import { Button, Col, Container, Row, Card } from "react-bootstrap";
import AdminNavbar from "../Components/AdminNavbar";
import { saveAs } from "file-saver";
import axios from "axios";
import { createFile, deleteFile } from "../http/FileApi";
import { createFile2, deleteFile2 } from "../http/File2Api";
import { createFile3, deleteFile3 } from "../http/File3Api";
import { useState } from "react";
import { createDocFile1, deleteDocFile1 } from "../http/DocFile1Api";
import { createDocFile2, deleteDocFile2 } from "../http/DocFile2Api";
import { createDocFile3, deleteDocFile3 } from "../http/DocFile3Api";
import { createDocFile4, deleteDocFile4 } from "../http/DocFile4Api";
import { createDocFile5, deleteDocFile5 } from "../http/DocFile5Api";
import CardComponent from "../Components/CardComponent";
import { createNapravFile1, deleteNapravFile1 } from "../http/NapravFile1Api";
import { createNapravFile2, deleteNapravFile2 } from "../http/NapravFile2Api";
import { createNapravFile3, deleteNapravFile3 } from "../http/NapravFile3Api";

function File() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [doc1, setDoc1] = useState(null);
  const [doc2, setDoc2] = useState(null);
  const [doc3, setDoc3] = useState(null);
  const [doc4, setDoc4] = useState(null);
  const [doc5, setDoc5] = useState(null);
  const [naprav1, setNaprav1] = useState(null);
  const [naprav2, setNaprav2] = useState(null);
  const [naprav3, setNaprav3] = useState(null);

  function selectFile1(e) {
    setFile1(e.target.files[0]);
  }

  function postFile1() {
    if (file1) {
      const formData = new FormData();
    formData.append("file", file1);

    createFile(formData).then((data) => {
      deleteFile(data.id - 1).then((data) => {
        alert("Шаблон был изменён!");
      });
    });
    } else {
      alert('Шаблон не выбран!');
    }
  }

  function selectFile2(e) {
    setFile2(e.target.files[0]);
  }

  function postFile2() {
    if (file2) {
      const formData = new FormData();
    formData.append("file", file2);

    createFile2(formData).then((data) => {
      deleteFile2(data.id - 1).then((data) => {
        alert("Шаблон был изменён!");
      });
    });
    } else {
      alert('Шаблон не выбран!');
    }
  }

  function selectFile3(e) {
    setFile3(e.target.files[0]);
  }

  function postFile3() {
    if (file3) {
      const formData = new FormData();
    formData.append("file", file3);

    createFile3(formData).then((data) => {
      deleteFile3(data.id - 1).then((data) => {
        alert("Шаблон был изменён!");
      });
    });
    } else {
      alert('Шаблон не выбран!');
    }
  }

  function selectDoc1(e) {
    setDoc1(e.target.files[0]);
  }

  function postDoc1() {
    if (doc1) {
      const formData = new FormData();
    formData.append("file", doc1);

    createDocFile1(formData).then((data) => {
      deleteDocFile1(data.id - 1).then((data) => {
        alert("Шаблон был изменён!");
      });
    });
    } else {
      alert('Шаблон не выбран!');
    }
  }

  function selectDoc2(e) {
    setDoc2(e.target.files[0]);
  }

  function postDoc2() {
    if (doc2) {
      const formData = new FormData();
    formData.append("file", doc2);

    createDocFile2(formData).then((data) => {
      deleteDocFile2(data.id - 1).then((data) => {
        alert("Шаблон был изменён!");
      });
    });
    } else {
      alert('Шаблон не выбран!');
    }
  }

  function selectDoc3(e) {
    setDoc3(e.target.files[0]);
  }

  function postDoc3() {
    if (doc3) {
      const formData = new FormData();
    formData.append("file", doc3);

    createDocFile3(formData).then((data) => {
      deleteDocFile3(data.id - 1).then((data) => {
        alert("Шаблон был изменён!");
      });
    });
    } else {
      alert('Шаблон не выбран!');
    }
  }

  function selectDoc4(e) {
    setDoc4(e.target.files[0]);
  }

  function postDoc4() {
    if (doc4) {
      const formData = new FormData();
    formData.append("file", doc4);

    createDocFile4(formData).then((data) => {
      deleteDocFile4(data.id - 1).then((data) => {
        alert("Шаблон был изменён!");
      });
    });
    } else {
      alert('Шаблон не выбран!');
    }
  }

  function selectDoc5(e) {
    setDoc5(e.target.files[0]);
  }

  function postDoc5() {
    if (doc5) {
      const formData = new FormData();
    formData.append("file", doc5);

    createDocFile5(formData).then((data) => {
      deleteDocFile5(data.id - 1).then((data) => {
        alert("Шаблон был изменён!");
      });
    });
    } else {
      alert('Шаблон не выбран!');
    }
  }

  function selectNaprav1(e) {
    setNaprav1(e.target.files[0]);
  }

  function postNaprav1() {
    if (naprav1) {
      const formData = new FormData();
    formData.append("file", naprav1);

    createNapravFile1(formData).then((data) => {
      deleteNapravFile1(data.id - 1).then((data) => {
        alert("Шаблон был изменён!");
      });
    });
    } else {
      alert('Шаблон не выбран!');
    }
  }

  function selectNaprav2(e) {
    setNaprav2(e.target.files[0]);
  }

  function postNaprav2() {
    if (naprav2) {
      const formData = new FormData();
    formData.append("file", naprav2);

    createNapravFile2(formData).then((data) => {
      deleteNapravFile2(data.id - 1).then((data) => {
        alert("Шаблон был изменён!");
      });
    });
    } else {
      alert('Шаблон не выбран!');
    }
  }

  function selectNaprav3(e) {
    setNaprav3(e.target.files[0]);
  }

  function postNaprav3() {
    if (naprav3) {
      const formData = new FormData();
    formData.append("file", naprav3);

    createNapravFile3(formData).then((data) => {
      deleteNapravFile3(data.id - 1).then((data) => {
        alert("Шаблон был изменён!");
      });
    });
    } else {
      alert('Шаблон не выбран!');
    }
  }

  function DownloadTemp1() {
    let url = process.env.REACT_APP_HOST + "/download";
    axios
      .get(process.env.REACT_APP_HOST + "/download", { responseType: "blob" })
      .then((res) => {
        const pdfBlob3 = new Blob([res.data], { type: "application/docx" });

        saveAs(pdfBlob3, "template1.docx");
      })
      .catch(
        (e)=> {alert("exception " + e);}
      );
  }

  function DownloadTemp2() {
    axios
      .get(process.env.REACT_APP_HOST + "/download2", { responseType: "blob" })
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/docx" });

        saveAs(pdfBlob, "template2.docx");
      });
  }

  function DownloadTemp3() {
    axios
      .get(process.env.REACT_APP_HOST + "/download3", { responseType: "blob" })
      .then((res) => {
        const pdfBlob2 = new Blob([res.data], { type: "application/docx" });

        saveAs(pdfBlob2, "template3.docx");
      });
  }

  function DownloadDoc1() {
    axios
      .get(process.env.REACT_APP_HOST + "/downloadDoc1", { responseType: "blob" })
      .then((res) => {
        const pdfBlob2 = new Blob([res.data], { type: "application/docx" });

        saveAs(pdfBlob2, "templateDoc1.docx");
      });
  }

  function DownloadDoc2() {
    axios
      .get(process.env.REACT_APP_HOST + "/downloadDoc2", { responseType: "blob" })
      .then((res) => {
        const pdfBlob2 = new Blob([res.data], { type: "application/docx" });

        saveAs(pdfBlob2, "templateDoc2.docx");
      });
  }

  function DownloadDoc3() {
    axios
      .get(process.env.REACT_APP_HOST + "/downloadDoc3", { responseType: "blob" })
      .then((res) => {
        const pdfBlob2 = new Blob([res.data], { type: "application/docx" });

        saveAs(pdfBlob2, "templateDoc3.docx");
      });
  }

  function DownloadDoc4() {
    axios
      .get(process.env.REACT_APP_HOST + "/downloadDoc4", { responseType: "blob" })
      .then((res) => {
        const pdfBlob2 = new Blob([res.data], { type: "application/docx" });

        saveAs(pdfBlob2, "templateDoc4.docx");
      });
  }

  function DownloadDoc5() {
    axios
      .get(process.env.REACT_APP_HOST + "/downloadDoc5", { responseType: "blob" })
      .then((res) => {
        const pdfBlob2 = new Blob([res.data], { type: "application/docx" });

        saveAs(pdfBlob2, "templateDoc5.docx");
      });
  }

  function DownloadNaprav1() {
    axios
      .get(process.env.REACT_APP_HOST + "/downloadNaprav1", { responseType: "blob" })
      .then((res) => {
        const pdfBlob2 = new Blob([res.data], { type: "application/docx" });

        saveAs(pdfBlob2, "naprav1.docx");
      });
  }

  function DownloadNaprav2() {
    axios
      .get(process.env.REACT_APP_HOST + "/downloadNaprav2", { responseType: "blob" })
      .then((res) => {
        const pdfBlob2 = new Blob([res.data], { type: "application/docx" });

        saveAs(pdfBlob2, "naprav2.docx");
      });
  }

  function DownloadNaprav3() {
    axios
      .get(process.env.REACT_APP_HOST + "/downloadNaprav3", { responseType: "blob" })
      .then((res) => {
        const pdfBlob2 = new Blob([res.data], { type: "application/docx" });

        saveAs(pdfBlob2, "naprav3.docx");
      });
  }



  return (
    <div style={{ marginBottom: "4rem" }}>
      <AdminNavbar />
      <Container style={{ marginTop: "7rem" }}>
        <h2 style={{ textAlign: "center" }}>Редактор шаблонов договоров</h2>
        <Row style={{ marginTop: "4rem" }}>
          <Col>
            <CardComponent name='Шаблон заявления №1 (за счет средств республиканского бюджета)'
            DownloadTemp={DownloadTemp1} selectFile={selectFile1} postFile={postFile1} marginTop='1rem' />
          </Col>
          <Col>
             <CardComponent name='Шаблон договора №2 (на платной основе для физ.лиц)'
            DownloadTemp={DownloadTemp2} selectFile={selectFile2} postFile={postFile2} marginTop='2.5rem' />
          </Col>
          <Col>
             <CardComponent name='Шаблон договора №3 (на платной основе для организаций)'
            DownloadTemp={DownloadTemp3} selectFile={selectFile3} postFile={postFile3} marginTop='1rem' />
          </Col>
        </Row>

        <Row style={{ marginTop: "3rem" }}>
          <Col>
             <CardComponent name='Шаблон приказа о зачислении на повышение квалификации'
            DownloadTemp={DownloadDoc1} selectFile={selectDoc1} postFile={postDoc1} marginTop='2.5rem' />
          </Col>
          <Col>
             <CardComponent name='Шаблон приказа о прекращении образовательных отношений'
            DownloadTemp={DownloadDoc2} selectFile={selectDoc2} postFile={postDoc2} marginTop='2.5rem' />
          </Col>
          <Col>
             <CardComponent name='Шаблон приказа о проведении итоговой аттестации'
            DownloadTemp={DownloadDoc3} selectFile={selectDoc3} postFile={postDoc3} marginTop='2.5rem' />
          </Col>
        </Row>

        <Row style={{ marginTop: "3rem" }}>
          <Col>
             <CardComponent name='Шаблон Зачётно-Экзаменационной ведомости'
            DownloadTemp={DownloadDoc4} selectFile={selectDoc4} postFile={postDoc4} marginTop='2.5rem' />
          </Col>
          <Col>
             <CardComponent name='Шаблон журнала направлений'
            DownloadTemp={DownloadDoc5} selectFile={selectDoc5} postFile={postDoc5} marginTop='4rem' />
          </Col>
          <Col>
          <CardComponent name='Шаблон направления №1 (за счет средств республиканского бюджета)'
            DownloadTemp={DownloadNaprav1} selectFile={selectNaprav1} postFile={postNaprav1} marginTop='1rem' />
          </Col>
        </Row>

        <Row style={{ marginTop: "3rem" }}>
          <Col>
             <CardComponent name='Шаблон направления №2 (на платной основе для физ.лиц)'
            DownloadTemp={DownloadNaprav2} selectFile={selectNaprav2} postFile={postNaprav2} marginTop='2.5rem' />
          </Col>
          <Col>
             <CardComponent name='Шаблон направления №3 (на платной основе для организаций)'
            DownloadTemp={DownloadNaprav3} selectFile={selectNaprav3} postFile={postNaprav3} marginTop='1rem' />
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default File;
