import axios from 'axios';
import config from '../config/config';

const dbAxios = axios.create({
    baseURL: config.DB_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const wikipediaAxios = axios.create({
    baseURL: config.WIKIPEDIA_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export { dbAxios, wikipediaAxios };
