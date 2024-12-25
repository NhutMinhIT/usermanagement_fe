import React, { createContext, useContext, useCallback } from "react";
import * as userService from "../services/user.service";
import { GetAllUsersParamsType, ICreateUser, IUpdateUser } from "../types/user-managment.type";

interface UserContextProps {
    getAllUsers: (params: GetAllUsersParamsType) => Promise<any>;
    getUserById: (id: string) => Promise<any>;
    createUser: (data: ICreateUser) => Promise<any>;
    removeUser: (id: string) => Promise<any>;
    updateUser: (id: string, data: IUpdateUser) => Promise<any>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const getAllUsers = useCallback(userService.getAllUsers, []);
    const getUserById = useCallback(userService.getUserById, []);
    const createUser = useCallback(userService.createUser, []);
    const removeUser = useCallback(userService.removeUser, []);
    const updateUser = useCallback(userService.updateUser, []);

    return (
        <UserContext.Provider value={{ getAllUsers, getUserById, createUser, updateUser, removeUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserManagementContext = (): UserContextProps => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserManagement must be used within a UserProvider");
    }
    return context;
};
