import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { useAuth } from "../../context/AuthContext";
import Button from "react-bootstrap/Button";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getPeaks, getUserPeaks } from "../../api/dbConnection";
import Loader from "../../Components/Loader/Loader";

const Profile = () => {
    const [peaks, setPeaks] = useState([]);
    const [userPeaks, setUserPeaks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, isLoggedIn } = useAuth();

    useEffect(() => {
        document.title = "Profil użytkownika - KGP Tracker";
    }, []);

    useEffect(() => {
        const fetchPeaks = async () => {
            try {
                const peaksData = await getPeaks();
                setPeaks(peaksData);

                if (user) {
                    const userPeakResponse = await getUserPeaks(user.id);
                    const sortedUserPeaks = userPeakResponse.sort((a, b) => new Date(a.date) - new Date(b.date));
                    setUserPeaks(sortedUserPeaks);
                }

                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPeaks();
    }, [user]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>Błąd: {error}</div>;
    }

    return (
        <div className="container mt-5 d-flex flex-column align-items-center">
            {isLoggedIn ? (
                <div className="welcome-message text-center">
                    <h1 className="main-heading">Profil - {user.name}</h1>
                    {userPeaks.length > 0 ? (
                        <>
                            <p>Szczyty z Korony Gór Polski zdobyte przez Ciebie, posortowane po dacie zdobycia:</p>
                            <ListGroup className="w-100">
                                {userPeaks.map((userPeak) => {
                                    const peak = peaks.find((p) => p.id === userPeak.peakId);
                                    return (
                                        <ListGroupItem key={userPeak.id} className="d-flex justify-content-between align-items-center">
                                            <span className="me-3"><strong>{peak.name}</strong> - <span className="d-md-none"><br/></span> Zdobycie: <span className="d-md-none"><br/></span>{userPeak.date}</span>
                                            <Button
                                                variant="info"
                                                as={Link}
                                                to={`/peaks/${peak.id}`}
                                                className="green-button"
                                            >
                                                Zobacz szczegóły
                                            </Button>
                                        </ListGroupItem>
                                    );
                                })}
                            </ListGroup>
                        </>
                    ) : (
                        <p>Tu w przyszłości pojawią się szczyty z Korony Gór Polski, które zdobędziesz!</p>
                    )}
                </div>
            ) : (
                <div className="login-prompt text-center">
                    <p>Zaloguj się, aby przejrzeć zdobyte szczyty.</p>
                    <Button as={Link} to="/login" variant="primary">Zaloguj się</Button>
                </div>
            )}
        </div>
    );
};

export default Profile;
