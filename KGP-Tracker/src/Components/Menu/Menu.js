import React from "react";
import "./Menu.scss"
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/kgp-tracker-logo.svg";
import { useAuth } from "../../context/AuthContext";

const Menu = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();


  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            width="200"
            className="d-inline-block align-top"
            alt="KGP Tracker logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Strona główna
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              O aplikacji
            </Nav.Link>
            <Nav.Link as={Link} to="/peaks">
              Lista szczytów
            </Nav.Link>
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/profile">
                  Profil
                </Nav.Link>
                <Nav.Link as={Link} to="/logout">
                  Wyloguj
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Logowanie
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Rejestracja
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
