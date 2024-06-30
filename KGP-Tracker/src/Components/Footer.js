import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <Navbar bg="light" className="footer mt-5">
            <Container className="justify-content-center">
                <Navbar.Text>
                    &copy; {currentYear} by  <a href="https://coffeetunes.pl" target="_blank" rel="noopener noreferrer">Coffee Tunes</a>
                </Navbar.Text>
            </Container>
        </Navbar>
    );
};

export default Footer;
