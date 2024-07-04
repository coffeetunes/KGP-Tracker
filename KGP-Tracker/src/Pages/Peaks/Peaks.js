import React, { useContext, useEffect, useState } from "react";
import "./Peaks.scss"
import { getPeaks, getUserPeaks } from "../../api/dbConnection";
import { getWikiData } from "../../api/wikiConnection";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../Components/Loader/Loader";

const Peaks = () => {
  const [peaks, setPeaks] = useState([]);
  const [userPeaks, setUserPeaks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    document.title = "Lista szczytów Korony Gór Polski - KGP Tracker";
  }, []);

  useEffect(() => {
    const fetchPeaks = async () => {
      try {
        const peaksData = await getPeaks();

        const peaksWithWikiData = await Promise.all(
          peaksData.map(async (peak) => {
            try {
              const wikiResponse = await getWikiData(peak.wikiName);
              if (wikiResponse.type === "standard") {
                return {
                  ...peak,
                  wiki: wikiResponse,
                  imageUrl:
                    wikiResponse.originalimage?.source ||
                    wikiResponse.thumbnail.source,
                };
              } else {
                return {
                  ...peak,
                  wiki: { extract: "Brak danych", thumbnail: { source: "" } },
                  imageUrl: "",
                };
              }
            } catch (error) {
              return {
                ...peak,
                wiki: { extract: "Brak danych", thumbnail: { source: "" } },
                imageUrl: "",
              };
            }
          }),
        );

        setPeaks(peaksWithWikiData);

        if (user) {
          const userPeakResponse = await getUserPeaks(user.id);
          setUserPeaks(userPeakResponse);
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
    <Container className="mt-5">
      <h2 className="page-title">Lista Szczytów Korony Gór Polski</h2>
      <Row>
        {peaks.map((peak) => {
          const userPeak = userPeaks.find(up => up.peakId === peak.id);
          const isUserPeak = Boolean(userPeak);
          return (
            <Col key={peak.id} md={4}>
              <Link to={`/peaks/${peak.id}`} className="text-decoration-none">
                <Card
                  className={`peak-card ${isUserPeak ? "user-peak" : ""}`}
                  style={{ backgroundImage: `url(${isUserPeak ? userPeak.image.base64 : peak.imageUrl})` }}
                >
                  <Card.ImgOverlay className="card-img-overlay">
                    {isUserPeak && (
                      <>
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="checkmark-icon"
                        />
                        <div className="peak-status">Zdobyty!</div>
                      </>
                    )}
                    <Card.Title className="peak-title">{peak.name}</Card.Title>
                    <Card.Text className="peak-info">
                      <strong>Pasmo:</strong> {peak.range}
                      <br />
                      <strong>Wysokość:</strong> {peak.height} m n.p.m.
                    </Card.Text>
                  </Card.ImgOverlay>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Peaks;
