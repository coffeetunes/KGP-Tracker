import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const AscentConfirmForm = ({ onSubmit }) => {
    const [date, setDate] = useState('');
    const [comment, setComment] = useState('');
    const [fileInfo, setFileInfo] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && !selectedFile.type.startsWith('image/')) {
            setError('Plik musi być obrazem (JPEG, PNG, GIF).');
            setFileInfo(null);
        } else {
            setError(null);
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = () => {
                setFileInfo({
                    name: selectedFile.name,
                    type: selectedFile.type,
                    size: Math.round(selectedFile.size / 1000) + ' kB',
                    base64: reader.result
                });
            };
            reader.onerror = (error) => {
                setError('Błąd podczas odczytu pliku: ' + error);
            };
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!fileInfo) {
            setError('Proszę załączyć zdjęcie potwierdzające zdobycie szczytu.');
            return;
        }
        const formData = {
            date,
            comment,
            fileInfo
        };
        onSubmit(formData);
    };

    return (
        <Form onSubmit={handleSubmit} className="mt-3">
            <Form.Group controlId="date" className="mb-3">
                <Form.Label>Data zdobycia szczytu</Form.Label>
                <Form.Control
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="comment" className="mb-3">
                <Form.Label>Opis trasy / Komentarz</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    style={{ resize: 'none' }}
                />
            </Form.Group>
            <Form.Group controlId="file" className="mb-3">
                <Form.Label>Załącz zdjęcie</Form.Label>
                <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                />
                <Form.Text className="text-muted">
                    Zdjęcie powinno przedstawiać Ciebie na szczycie, najlepiej z widocznym punktem charakterystycznym dla danego szczytu (tabliczka, specyficzny kamień itp.)
                </Form.Text>
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button type="submit" variant="primary" className="mb-3">
                Potwierdź zdobycie szczytu
            </Button>
        </Form>
    );
};

export default AscentConfirmForm;