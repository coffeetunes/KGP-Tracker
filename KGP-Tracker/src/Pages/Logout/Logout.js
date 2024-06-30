import React, { useEffect } from 'react';
import "./Logout.scss"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        setTimeout(() => navigate("/login"), 3000);
    }, [logout, navigate]);

    return (
        <Container className="mt-5 d-flex justify-content-center">
            <Row className="w-100 d-flex justify-content-center">
                <Col md={6} lg={6}>
        <div className="alert alert-success">Nastąpiło poprawne wylogowanie. Do zobaczenia!</div>
                </Col>
            </Row>
        </Container>
    );
};

export default Logout;
