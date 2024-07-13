import React, { useEffect, useState } from "react";
import "./Register.scss"
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/dbConnection";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Rejestracja - KGP Tracker";
  }, []);

  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength) {
      return "Hasło musi składać się z co najmniej 8 znaków.";
    }
    if (!hasNumber.test(password)) {
      return "Hasło musi zawierać co najmniej jedną cyfrę.";
    }
    if (!hasSpecialChar.test(password)) {
      return "Hasło musi zawierać co najmniej jeden znak specjalny.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Hasła nie są zgodne.");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      const user = await registerUser(name, email, password);
      if (user) {
        setSuccess('Rejestracja przebiegła pomyślnie!')
        const timer = setTimeout(() => navigate("/login"), 3000);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Row className="w-100 d-flex justify-content-center">
        <Col md={6} lg={6}>
          <h2 className="page-title text-center">Zarejestruj się</h2>
          <p className="text-center">Wprowadź dane. Hasło powinno składać się z co najmniej ośmiu znaków, zawierać co najmniej jedną cyfrę i co najmniej jeden znak specjalny.</p>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          { !success &&
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Imię / nazwa użytkownika
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
              </div>
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
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Potwierdź hasło
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
              </div>
              <button type="submit" className="btn btn-primary green-button">
                Zarejestruj
              </button>
            </form>}
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
