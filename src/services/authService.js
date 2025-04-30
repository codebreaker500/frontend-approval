import axiosInstance, { API_BASE_URL } from '@/utlis/JwtToken';
import axios from 'axios';

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            email,
            password,
        });
        return response.data; // Return the response data
    } catch (error) {
        throw error.response?.data || error.message; // Handle and throw API errors
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