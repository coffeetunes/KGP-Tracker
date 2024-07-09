import React, { useEffect } from 'react';
import "./Home.scss"
import { useAuth } from '../../context/AuthContext';
import Button from 'react-bootstrap/Button';
import {Carousel} from "react-bootstrap";
import { Link } from 'react-router-dom';

const Home = () => {
    const { user, isLoggedIn } = useAuth();

    useEffect(() => {
        document.title = 'Strona Główna - KGP Tracker';
    }, []);

    return (
<>
        <Carousel className="main-carousel">
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={require("../../assets/images/slide-1.jpg")}
                    alt="First slide"
                />
                <div className="overlay"></div>
                <Carousel.Caption>
                    <h3>Główne Hasło 1</h3>
                    <p>Podhasło 1</p>
                    <Button variant="primary">Przycisk 1</Button>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={require("../../assets/images/slide-2.jpg")}
                    alt="Second slide"
                />
                <div className="overlay"></div>
                <Carousel.Caption>
                    <h3>Główne Hasło 2</h3>
                    <p>Podhasło 2</p>
                    <Button variant="primary">Przycisk 2</Button>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={require("../../assets/images/slide-3.jpg")}
                    alt="Third slide"
                />
                <div className="overlay"></div>
                <Carousel.Caption>
                    <h3>Główne Hasło 3</h3>
                    <p>Podhasło 3</p>
                    <Button variant="primary">Przycisk 3</Button>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>

       {/* <div className="container mt-5">



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
        </div>*/}
</>
    );
};

export default Home;
