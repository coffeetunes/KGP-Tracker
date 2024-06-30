import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Home = () => {
    const { user, isLoggedIn } = useAuth();

    useEffect(() => {
        document.title = 'Strona Główna - KGP Tracker';
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="main-heading">Strona Główna</h1>

            {isLoggedIn ? (
                <div className="welcome-message">
                    <h2>Cześć, {user.name}!</h2>
                    <p>Tu w przyszłości pojawią się szczyty z Korony Gór Polski, które zdobędziesz!</p>
                </div>
            ) : (
                <div className="login-prompt">
                    <p>Zaloguj się, aby przejrzeć zdobyte szczyty.</p>
                    <Button as={Link} to="/login" variant="primary">Zaloguj się</Button>
                </div>
            )}
        </div>
    );
};

export default Home;
