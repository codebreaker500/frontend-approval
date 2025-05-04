import axiosInstance, { API_BASE_URL } from '@/utlis/JwtToken';
import axios from 'axios';
import { registerToSocket } from '@/services/socketService';

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            email,
            password,
        });
        const userData = response.data; 

        if (userData && userData.token) {
            registerToSocket(userData.token);
        }

        return userData;
    } catch (error) {
        throw error.response?.data || error.message; 
    }
};

export const getUserProfile = async () => { 
    try {
        const response = await axiosInstance.get(`/auth/user`);
        return response.data; 
    } catch (error) {
        throw error.response?.data || error.message; 
    }
};