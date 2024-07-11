import React, { useEffect, useState } from "react";
import "./Login.scss"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUser } from "../../api/dbConnection";
import { useAuth } from "../../context/AuthContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login } = useAuth();

  useEffect(() => {
    document.title = "Logowanie - KGP Tracker";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await getUser(email, password);
      if (user) {
        login(user);
        setError(null);
        setSuccess("Logowanie zakończone sukcesem!");
        const redirectTo = location.state?.from || '/';
        setTimeout(() => navigate(redirectTo), 3000);
      } else {
        setError("Nieprawidłowy e-mail lub hasło");
      }
    } catch (error) {
      console.error("Błąd logowania:", error);
      setError("Logowanie nie powiodło się, spróbuj ponownie później");
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Row className="w-100 d-flex justify-content-center">
        <Col md={6} lg={6}>
          <h2 className="page-title text-center">Zaloguj się</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          {!user && (
            <>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Adres e-mail
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Hasło
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 green-button">
                  Zaloguj
                </button>
              </form>
              <div className="mt-3 text-center">
                <p>
                  Nie masz jeszcze konta?{" "}
                  <Link to="/register">Zarejestruj&nbsp;się!</Link>
                </p>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
