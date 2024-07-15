import axios from "axios";
import { Company } from "../lib/interfaces";

const HOST = `http://localhost:3001`;

export const getCompanies = async (page: number = 0) => {
    try {
        const limit = 30;
        const offset = page * limit;
        const { data } = await axios.get(`${HOST}/clients`, { params: { limit, offset } });
        const { result } = data;

        const companies: Company[] = result.map((resp: { id: number, company_name: string, cin: string, pin: string }) => {
            return {
                id: resp.id,
                companyName: resp.company_name,
                cin: resp.cin,
                pin: resp.pin
            }
        });

        return companies;
    } catch (error) {
        // Can attach logger to log errors
        throw error;
    }
};

export const updateCompany = async (bodyData: Company, id: number) => {
    try {
        const updateData = {
            ...bodyData,
            company_name: bodyData.companyName,
        }
        const { data } = await axios.put(`${HOST}/client/${id}`, updateData);
        return data;
    } catch (error) {
        // Can attach logger to log errors
        throw error;
    }
};

export const deleteCompany = async (id: number) => {
    try {
        const { data } = await axios.delete(`${HOST}/client/${id}`);
        return data;
    } catch (error) {
        // Can attach logger to log errors
        throw error;
    }
};

export const esSearch = async (query: string) => {
    try {
        const { data } = await axios.get(`${HOST}/search`, { params: { q: query } });
        const { result } = data;
        const response: Company[] = result.map(element => {
            const {_source: {company_name, cin, pin}} = element
            return {
                companyName: company_name,
                cin,
                pin
            }
        });
        return response;
    } catch (error) {
        // Can attach logger to log errors
        throw error;
    }
};