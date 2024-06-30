import React, { useContext, useEffect, useState } from "react";
import "./PeakDetails.scss"
import { Link, useParams } from "react-router-dom";
import {
  confirmUserPeak,
  getSinglePeak,
  getUserPeaks,
} from "../../api/dbConnection";
import { getWikiData } from "../../api/wikiConnection";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { AuthContext } from "../../context/AuthContext";

const PeakDetails = () => {
  const { id } = useParams();
  const [peak, setPeak] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userPeak, setUserPeak] = useState(null);
  const [firstAscend, setFirstAscend] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    document.title = `Informacje o szczycie - KGP Tracker`;
  }, []);

  useEffect(() => {
    const fetchPeak = async () => {
      try {
        const peakData = await getSinglePeak(id);
        const wikiResponse = await getWikiData(peakData.wikiName);

        const peakWithWikiData = {
          ...peakData,
          wiki:
            wikiResponse.type === "standard"
              ? wikiResponse
              : { extract: "Brak danych", thumbnail: { source: "" } },
          imageUrl:
            wikiResponse.originalimage?.source ||
            wikiResponse.thumbnail?.source ||
            "",
        };

        setPeak(peakWithWikiData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    const fetchUserPeaks = async () => {
      if (user) {
        try {
          const userPeakResponse = await getUserPeaks(user.id);
          const userPeakData = userPeakResponse.find(
            (up) => up.peakId.toString() === id.toString(),
          );
          if (userPeakData) {
            setUserPeak(userPeakData);
          }
        } catch (error) {
          console.log(`Błąd podczas ładowania szczytów użytkownika: ${error}`);
        }
      }
    };

    fetchPeak();
    fetchUserPeaks();
  }, [id, user]);

  const handleConfirmClick = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        const today = new Date().toISOString().split("T")[0];
        const newUserPeak = await confirmUserPeak(user.id, id, today);
        setUserPeak(newUserPeak);
        setFirstAscend(true);
      } catch (error) {
        console.log(`Błąd podczas zatwierdzania zdobycia szczytu: ${error}`);
      }
    }
  };

  if (loading) {
    return <div>Trwa ładowanie informacji...</div>;
  }

  if (error) {
    return <div>Błąd: {error}</div>;
  }

  return (
    <Container className="mt-5">
      {peak && (
        <Container className="mt-5 peak-details">
          {peak && (
            <Row>
              <Col md={6} className="pe-5">
                <div className="peak-info">
                  <h2>{peak.name}</h2>
                  <p>
                    <strong>Pasmo:</strong> {peak.range}
                  </p>
                  <p>
                    <strong>Wysokość:</strong> {peak.height} m
                  </p>
                  <p>
                    <strong>Opis:</strong> {peak.wiki.extract}
                  </p>
                  {firstAscend && (
                    <Alert variant="success" className="my-3">
                      Gratulacje zdobycia szczytu!
                    </Alert>
                  )}
                  {userPeak && !firstAscend && (
                    <Alert variant="success" className="my-3">
                      Ten szczyt jest już przez Ciebie zdobyty.
                      <br />
                      Data zdobycia: {userPeak.date}
                    </Alert>
                  )}
                  {!userPeak && !firstAscend && user && (
                    <Button
                      variant="primary"
                      className="my-3"
                      onClick={handleConfirmClick}
                    >
                      Potwierdź zdobycie szczytu
                    </Button>
                  )}
                  {!user && (
                    <Alert variant="warning" className="my-3">
                      <Link to="/login" style={{ textDecoration: "none" }}>
                        Zaloguj się
                      </Link>
                      , aby potwierdzić zdobycie szczytu.
                    </Alert>
                  )}
                </div>
              </Col>
              <Col md={6}>
                {peak.imageUrl && (
                  <img
                    src={peak.imageUrl}
                    alt={peak.name}
                    className="peak-image"
                  />
                )}
              </Col>
            </Row>
          )}
        </Container>
      )}
    </Container>
  );
};

export default PeakDetails;
