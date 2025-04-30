import axiosInstance from "@/utlis/JwtToken";

export const getDepositoUser = async () => { 
    try {
        const response = await axiosInstance.get(`/depositos`);
        return response.data; 
    } catch (error) {
        throw error.response?.data || error.message; 
    }
};

export const createNewDeposito = async (placementNominal, tenor, rate) => {
    try {
        const response = await axiosInstance.post(`/depositos/create`, {
            placementNominal,
            tenor,
            rate
        });

        return response.data;
    } catch (error) {
        throw error.response?.data || error.message; 
    }
};