import React, { useEffect } from 'react';
import "./Home.scss"
import { useAuth } from '../../context/AuthContext';
import Button from 'react-bootstrap/Button';
import { Carousel } from "react-bootstrap";
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
                        src={require("../../assets/images/slide-2.jpg")}
                        alt="Second slide"
                    />
                    <div className="overlay"></div>
                    <Carousel.Caption>
                        <h3>Odkrywaj Polskie Góry</h3>
                        <p>Znajdź i zdobywaj szczyty Korony Gór Polski</p>
                        <Button variant="primary" as={Link} to="/peaks" className="carousel-button green-button">Sprawdź szczyty</Button>
                    </Carousel.Caption>
                </Carousel.Item>
                {!isLoggedIn &&
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={require("../../assets/images/slide-1.jpg")}
                            alt="First slide"
                        />
                        <div className="overlay"></div>
                        <Carousel.Caption>
                            <h3>Twój osobisty dziennik wypraw KGP</h3>
                            <p>Monitoruj swoje zdobycze</p>
                            <Button variant="primary" as={Link} to="/login" className="carousel-button green-button">Zaloguj się</Button>
                        </Carousel.Caption>
                    </Carousel.Item>}
                {!isLoggedIn && <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={require("../../assets/images/slide-3.jpg")}
                        alt="Third slide"
                    />
                    <div className="overlay"></div>
                    <Carousel.Caption>
                        <h3>Zdobądź z nami Koronę Gór Polski</h3>
                        <p>Utwórz konto i zacznij swoją przygodę z górami!</p>
                        <Button variant="primary" as={Link} to="/register" className="carousel-button green-button">Zarejestruj się</Button>
                    </Carousel.Caption>
                </Carousel.Item>}

                {isLoggedIn &&
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={require("../../assets/images/slide-4.jpg")}
                            alt="Third slide"
                        />
                        <div className="overlay"></div>
                        <Carousel.Caption>
                            <h3>{user.name}, ile zostało do zdobycia Korony?</h3>
                            <p>Wejdź na swój profil i sprawdź postęp!</p>
                            <Button variant="primary" as={Link} to="/profile" className="carousel-button green-button">Przejdź do profilu</Button>
                        </Carousel.Caption>
                    </Carousel.Item>
                }
            </Carousel>

        </>
    );
};

export default Home;
