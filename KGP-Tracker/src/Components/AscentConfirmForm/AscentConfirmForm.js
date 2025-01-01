import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const AscentConfirmForm = ({ onSubmit }) => {
    const [date, setDate] = useState('');
    const [comment, setComment] = useState('');
    // Przechowujemy oryginalny plik jako obiekt File
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && !file.type.startsWith('image/')) {
            setError('Plik musi być obrazem (JPEG, PNG, GIF).');
            setSelectedFile(null);
        } else {
            setError(null);
            setSelectedFile(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Walidacja: czy mamy datę, i czy mamy plik
        if (!selectedFile) {
            setError('Proszę załączyć zdjęcie potwierdzające zdobycie szczytu.');
            return;
        }

        // Zamiast obiektu z base64, przekazujemy rodzicowi oryginalny plik
        const formData = {
            date,
            comment,
            file: selectedFile,  // klucz: "file"
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
                    Zdjęcie powinno przedstawiać Ciebie na szczycie...
                </Form.Text>
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button type="submit" variant="primary" className="mb-3 green-button">
                Potwierdź zdobycie szczytu
            </Button>
        </Form>
    );
};

export default AscentConfirmForm;
