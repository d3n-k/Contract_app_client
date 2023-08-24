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
                  href="https://www.bsmu.by/upload/docs/fakulteti/f_fpk/2021-2/12-21/10-21/bsmu-svodniy-plan-2022.pdf"
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
                  href="https://www.bsmu.by/upload/docs/fakulteti/f_fpk/2021-2/12-21/10-21/bsmu-svodniy-plan-2022.pdf"
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
