import axios from "axios";
import { CREATE_USER_ENDPOINT, GET_ALL_USER_ENDPOINT, GET_USER_BY_ID_ENDPOINT, REMOVE_USER_ENDPOINT, UPDATE_USER_ENDPOINT } from "../../../constants/apiConstant";
import { getAuthHeaders } from "../../../utils/getAuthHeaders";
import { ICreateUser, IUpdateUser, TGetAllUsersParams } from "../types/userManagmentType";
import { LIMIT_NUMBER_DEFAULT, PAGE_NUMBER_DEFAULT, SEARCH_PARAMS_DEFAULT } from "../../../hooks/constant";


export const getAllUsers = async ({ page = PAGE_NUMBER_DEFAULT, limit = LIMIT_NUMBER_DEFAULT, search = SEARCH_PARAMS_DEFAULT }: TGetAllUsersParams) => {
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