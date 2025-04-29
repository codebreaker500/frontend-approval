import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Use environment variable for the API base URL

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