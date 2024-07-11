import React, { useContext, useEffect, useState } from "react";
import "./PeakDetails.scss";
import { Link, useParams } from "react-router-dom";
import { confirmUserPeak, getSinglePeak, getUserPeaks } from "../../api/dbConnection";
import { getWikiData } from "../../api/wikiConnection";
import AscentConfirmForm from "../../Components/AscentConfirmForm/AscentConfirmForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../Components/Loader/Loader";

const PeakDetails = () => {
  const { id } = useParams();
  const [peak, setPeak] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userDataLoading, setUserDataLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userPeak, setUserPeak] = useState(null);
  const [firstAscent, setFirstAscent] = useState(false);
  const [showConfirmForm, setShowConfirmForm] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    document.title = `Informacje o szczycie - KGP Tracker`;
  }, []);

  useEffect(() => {
    const fetchPeakData = async () => {
      try {
        const peakData = await getSinglePeak(id);
        const wikiResponse = await getWikiData(peakData.wikiName);

        const peakWithWikiData = {
          ...peakData,
          wiki: wikiResponse.type === "standard"
              ? wikiResponse
              : { extract: "Brak danych", thumbnail: { source: "" } },
          imageUrl: wikiResponse.originalimage?.source || wikiResponse.thumbnail?.source || "",
        };

        setPeak(peakWithWikiData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserPeakData = async () => {
      if (user) {
        try {
          const userPeakResponse = await getUserPeaks(user.id);
          const userPeakData = userPeakResponse.find(up => up.peakId.toString() === id.toString());
          setUserPeak(userPeakData || null);
        } catch (error) {
          console.log(`Błąd podczas ładowania szczytów użytkownika: ${error}`);
        } finally {
          setUserDataLoading(false);
        }
      }
      else {
        setUserDataLoading(false);
      }
    };

    fetchPeakData();
    fetchUserPeakData();
  }, [id, user]);

  const handleShowConfirmForm = () => setShowConfirmForm(true);

  const handleConfirmClick = async (formData) => {
    if (user) {
      try {
        const newUserPeak = await confirmUserPeak(user.id, id, formData.date, formData.comment, formData.fileInfo);
        setUserPeak(newUserPeak);
        setFirstAscent(true);
      } catch (error) {
        console.log(`Błąd podczas zatwierdzania zdobycia szczytu: ${error}`);
      }
    }
  };

  if (loading || userDataLoading) return <Loader />;
  if (error) return <div>Błąd: {error}</div>;

  return (
      <Container className="mt-5">
        {peak && (
            <Container className="mt-5 peak-details">
              <Row>
                <Col md={6} className="pe-5">
                  <div className="peak-info">
                    <h2>{peak.name}</h2>
                    <p><strong>Pasmo:</strong> {peak.range}</p>
                    <p><strong>Wysokość:</strong> {peak.height} m n.p.m.</p>
                    <p><strong>Opis:</strong> {peak.wiki.extract}</p>
                    {firstAscent && <Alert variant="success" className="my-3">Gratulacje zdobycia szczytu!</Alert>}
                    {userPeak && !firstAscent && (
                        <Alert variant="success" className="my-3">
                          Ten szczyt jest już przez Ciebie zdobyty.
                          <br />
                          Data zdobycia: {userPeak.date}
                          <br />
                          <br/>
                          Twój komentarz:
                          <br/>
                          {userPeak.comment}
                        </Alert>
                    )}
                    {!userPeak && !firstAscent && user && (
                        !showConfirmForm ? (
                            <Button variant="primary" className="my-3 green-button" onClick={handleShowConfirmForm}>
                              Potwierdź zdobycie szczytu
                            </Button>
                        ) : (
                            <AscentConfirmForm onSubmit={handleConfirmClick} />
                        )
                    )}
                    {!user && (
                        <Alert variant="warning" className="my-3">
                          <Link to="/login" state={{ from: `/peaks/${id}` }} style={{ textDecoration: "none" }}>
                            Zaloguj się
                          </Link>
                          , aby potwierdzić zdobycie szczytu.
                        </Alert>
                    )}
                  </div>
                </Col>
                <Col md={6}>
                  {userPeak?.image?.base64 ? (
                      <img src={userPeak.image.base64} alt={peak.name} className="peak-image" />
                  ) : peak.imageUrl && (
                      <img src={peak.imageUrl} alt={peak.name} className="peak-image" />
                  )}
                </Col>
              </Row>
            </Container>
        )}
      </Container>
  );
};

export default PeakDetails;
