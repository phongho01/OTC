import axios from 'axios';

const API_URL = 'https://otc-api.onrender.com/api/v1';
// const API_URL = 'http://localhost:3001/api/v1';

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default instance;