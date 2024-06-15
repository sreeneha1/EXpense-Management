import axios from 'axios';
import { localhost_backend } from '../env';

export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${localhost_backend}inventory/product`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addProduct = async (newProduct) => {
    try {
        const response = await axios.post(`${localhost_backend}inventory/product`, newProduct, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateProduct = async (id, updatedProduct) => {
    try {
        const response = await axios.put(`${localhost_backend}inventory/product/${id}/`, updatedProduct, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        await axios.delete(`${localhost_backend}inventory/product/${id}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
    } catch (error) {
        throw error;
    }
};
