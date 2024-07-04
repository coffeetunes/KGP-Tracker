// Loader.js
import React from 'react';
import { Triangle } from 'react-loader-spinner';
import './Loader.scss';

const Loader = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <Triangle color="#3498db" size={150} />
    </div>
);

export default Loader;
