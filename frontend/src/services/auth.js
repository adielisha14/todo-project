import axios from '../utils/axios';

const login = async (credentials) => {
    const response = await axios.post('/api/auth/login', credentials);
    const { token, user } = response.data;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    return user;
};

const register = async (credentials) => {
    const response = await axios.post('/api/auth/register', credentials);
    const { token, user } = response.data;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    return user;
};

export default { login, register };