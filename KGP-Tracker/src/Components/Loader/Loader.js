// Loader.js
import React from 'react';
import { Triangle } from 'react-loader-spinner';
import './Loader.scss';
import '../../assets/styles/colors.scss'

const Loader = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <Triangle className="triangle" size={150} />
    </div>
);

export default Loader;
