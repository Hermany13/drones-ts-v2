import axios from 'axios';

const api = axios.create({
  baseURL: 'http://services.solucx.com.br/mock',
});

export default api;
