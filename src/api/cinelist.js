import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/api/movies';

const cinelist = axios.create({
  baseURL: API_URL,
});

cinelist.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default cinelist;