import axios from "axios";
import { API_URL } from '@env';

/**
 * Fetches data from the Aviator API for a specific table.
 * @param {string} table - The name of the table to fetch data from.
 * @returns {Promise<any>} - A promise that resolves to the fetched data.
 */
export const fetchAviatorData = async (table: string) => {
    try {
        const response = await axios.get(`${API_URL}?table=${table}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


