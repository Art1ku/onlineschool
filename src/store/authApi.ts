// authApi.ts
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/auth';

export const register = async (username: string, password: string, email: string) => {
    try {
        const response = await axios.post(`${API_URL}/user/register`, { username, password, email });
        return response.data;
    } catch (error) {
        console.error('Ошибка при регистрации:', error.response?.data?.message || error.message);
        throw error;
    }
};

export const login = async (identifier: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { identifier, password });
        const { accessToken, refreshToken, role } = response.data;

        // Сохраняем токены и роль
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        return { accessToken, refreshToken, role };
    } catch (error) {
        console.error('Ошибка при входе:', error.response?.data?.message || error.message);
        throw error;
    }
};

export const verifyEmail = async (email: string, verificationCode: string) => {
    try {
        const response = await axios.post(`${API_URL}/verify`, { email, verificationCode });
        return response.data;
    } catch (error) {
        console.error('Ошибка верификации:', error.response?.data?.message || error.message);
        throw error;
    }
};
