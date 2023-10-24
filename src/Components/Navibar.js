import { Navbar, Nav, Button } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";


function Navibar() {
  const mobile = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <>
      <Navbar
        style={{ backgroundColor: "#7c7676" }}
        fixed="top"
        collapseOnSelect
        expand="lg"
        variant="dark"
      >
        {mobile ? (
          <Navbar.Brand className="nav-brand" style={{ marginLeft: "5%" }}>
            <img
              style={{ height: "50px" }}
              src="https://www.bsmu.by/design/logo.png"
              alt=""
            />
          </Navbar.Brand>
        ) : (
          <Navbar.Brand className="nav-brand" style={{ marginLeft: "5%" }}>
            Белорусский государственный медицинский университет
          </Navbar.Brand>
        )}

        <Navbar.Toggle
          style={{ marginRight: "5%" }}
          aria-controls="responsive-navbar-nav"
        />

        {mobile ? (
          <Navbar.Collapse
            style={{ marginTop: "3%" }}
            className="justify-content-end"
            id="responsive-navbar-nav"
          >
            <Nav>
              <Button variant="success">
                <a
                  style={{ color: "white", textDecoration: "none" }}
                  rel="noreferrer"
                  target="_blank"
                  href="https://ipk.bsmu.by/assets/templates/files/contact_info/%D0%A1%D0%B2%D0%BE%D0%B4%D0%BD%D1%8B%D0%B9%20%D0%BF%D0%BB%D0%B0%D0%BD%202023%20%D1%81%20%D0%B8%D0%B7%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20(17)_.pdf"
                >
                  Сводный план
                </a>
              </Button>
            </Nav>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse
            style={{ marginRight: "5%" }}
            className="justify-content-end"
            id="responsive-navbar-nav"
          >
            <Nav>
              <Button variant="success">
                <a
                  style={{ color: "white", textDecoration: "none" }}
                  rel="noreferrer"
                  target="_blank"
                  href="https://ipk.bsmu.by/assets/templates/files/contact_info/%D0%A1%D0%B2%D0%BE%D0%B4%D0%BD%D1%8B%D0%B9%20%D0%BF%D0%BB%D0%B0%D0%BD%202023%20%D1%81%20%D0%B8%D0%B7%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F%D0%BC%D0%B8%20(17)_.pdf"
                >
                  Сводный план
                </a>
              </Button>
            </Nav>
          </Navbar.Collapse>
        )}
      </Navbar>
    </>
  );
}

export default Navibar;
