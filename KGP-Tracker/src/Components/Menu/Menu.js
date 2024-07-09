import React, { useState } from "react";
import "./Menu.scss";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../../assets/kgp-tracker-logo.svg";
import { useAuth } from "../../context/AuthContext";

const Menu = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNavigate = (path) => {
    navigate(path);
    handleClose();
  };

  return (
      <>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand onClick={() => handleNavigate("/")}>
              <img
                  src={logo}
                  width="200"
                  className="d-inline-block align-top"
                  alt="KGP Tracker logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
            <Navbar.Offcanvas
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                placement="end"
                show={show}
                onHide={handleClose}
                className="mobile-menu"
            >
              <Offcanvas.Header closeButton>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link onClick={() => handleNavigate("/")}>
                    Strona główna
                  </Nav.Link>
{/*                  <Nav.Link onClick={() => handleNavigate("/about")}>
                    O aplikacji
                  </Nav.Link>*/}
                  <Nav.Link onClick={() => handleNavigate("/peaks")}>
                    Lista szczytów
                  </Nav.Link>
                  {isLoggedIn ? (
                      <>
                        <Nav.Link onClick={() => handleNavigate("/profile")}>
                          Profil
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => {
                              logout();
                              handleNavigate("/logout");
                            }}
                        >
                          Wyloguj
                        </Nav.Link>
                      </>
                  ) : (
                      <>
                        <Nav.Link onClick={() => handleNavigate("/login")}>
                          Logowanie
                        </Nav.Link>
                        <Nav.Link onClick={() => handleNavigate("/register")}>
                          Rejestracja
                        </Nav.Link>
                      </>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </>
  );
};

export default Menu;
