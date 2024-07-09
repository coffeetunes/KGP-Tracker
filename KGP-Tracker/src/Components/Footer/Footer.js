import React, {useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const footer = document.querySelector('.footer');
        if (footer) {
            document.documentElement.style.setProperty('--footer-height', `${footer.offsetHeight}px`);
        }
    }, []);

    return (
        <Navbar bg="light" className="footer" style={{marginTop:'auto'}}>
            <Container className="justify-content-center">
                <Navbar.Text>
                    &copy; {currentYear} by  <a href="https://coffeetunes.pl" target="_blank" rel="noopener noreferrer">Coffee Tunes</a>
                </Navbar.Text>
            </Container>
        </Navbar>
    );
};

export default Footer;
