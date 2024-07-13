import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './NotFound.scss';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404</h1>
            <p className="not-found-message">Nie znaleziono strony, której szukasz.</p>
            <Button variant="primary" className="green-button" onClick={() => navigate('/')}>Wróć do strony głównej</Button>
        </div>
    );
};

export default NotFound;
