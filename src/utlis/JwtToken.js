import axios from 'axios';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

export const getTokenFromLocalStorage = () => {
    return localStorage.getItem('jwtToken'); 
};

export const handleInvalidToken = (error) => { 
    if (error?.message === "Invalid token") {
        localStorage.removeItem('jwtToken'); 
        window.location.href = '/auth/login'; 
    }
};

// Attach the token to the Axios instance
const axiosInstance = axios.create({
    baseURL: API_BASE_URL, 
    timeout: 10000,
});

const attachTokenToRequest = (axiosInstance) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = getTokenFromLocalStorage();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            handleInvalidToken(error.response?.data);
            return Promise.reject(error);
        }
    );
};

attachTokenToRequest(axiosInstance);

export default axiosInstance;