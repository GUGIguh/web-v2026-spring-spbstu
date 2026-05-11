import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001/api',
    withCredentials: true, // аналог credentials: 'include'
});

export default api;