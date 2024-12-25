import axios from "axios";
import { CREATE_USER_ENDPOINT, GET_ALL_USER_ENDPOINT, GET_USER_BY_ID_ENDPOINT, REMOVE_USER_ENDPOINT, UPDATE_USER_ENDPOINT } from "../../../constants/api.constant";
import { getAuthHeaders } from "../../../utils/getAuthHeaders";
import { GetAllUsersParamsType, ICreateUser, IUpdateUser } from "../types/user-managment.type";


export const getAllUsers = async ({ page = 1, limit = 10, search = "" }: GetAllUsersParamsType) => {
    try {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            search
        });
        const response = await axios.get(`${GET_ALL_USER_ENDPOINT}?${params.toString()}`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching upload data:', error);
        throw error;
    }
};

export const getUserById = async (id: string) => {
    try {
        const response = await axios.get(`${GET_USER_BY_ID_ENDPOINT}/${id}`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

export const createUser = async (data: ICreateUser) => {
    try {
        const response = await axios.post(CREATE_USER_ENDPOINT, data, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const updateUser = async (id: string, data: IUpdateUser) => {
    try {
        const response = await axios.post(`${UPDATE_USER_ENDPOINT}/${id}`, data, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const removeUser = async (id: string) => {
    try {
        const response = await axios.delete(`${REMOVE_USER_ENDPOINT}/${id}`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Error removing user:', error);
        throw error;
    }
}