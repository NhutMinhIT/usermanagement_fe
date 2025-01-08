import { IUser } from "../../../types/userType";

export type TGetAllUsersParams = {
    page?: number;
    limit?: number | string;
    search?: string;
}

export interface ICreateUser {
    fullName: string;
    username: string;
    email: string;
    password: string;
    role: string;
}

export interface IGetAllUser {
    data: IUser[];
    total: number;
    page: number;
    limit: number;
}

export interface IUpdateUser {
    username?: string;
    fullName?: string;
    email?: string;
    password?: string;
    role?: string;
}