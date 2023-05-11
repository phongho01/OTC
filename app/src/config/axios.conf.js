import axios from 'axios';

const env = import.meta.env.VITE_ENVIROMENT

const API_URL = {
    development: 'http://localhost:3001/api/v1',
    production: 'https://otc-api.onrender.com/api/v1'
}

const instance = axios.create({
    baseURL: API_URL[env],
    headers: {
        'Content-Type': 'application/json'
    }
});

export default instance;