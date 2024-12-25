import React, { createContext, useState, useEffect, useCallback, useContext } from "react";
import { ILoginResponse } from "./types/auth.type";
import { LOGIN_API } from "../../constants/api.constant";
import axios from "axios";
import { getLocalStorageData, removeLocalStorageData, removeLocalStorageToken, setLocalStorageData, setLocalStorageToken } from "../../utils/local-storage.util";

// Define context props
type AuthContextProps = {
    account: ILoginResponse | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<ILoginResponse>;
    logout: () => void;
}

// Create context object
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// create provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [isAccount, setIsAccount] = useState<ILoginResponse | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // login function to authenticate user
    const login = useCallback(async (username: string, password: string) => {
        try {
            const response = await axios.post(`${LOGIN_API}`, {
                username,
                password
            },);

            const data: ILoginResponse = response.data;
            setIsAccount(data);
            setIsAuthenticated(true);

            // Save user info to localStorage          
            setLocalStorageData(data)
            setLocalStorageToken(data.access_token)
            return data;
        } catch (error) {
            throw new Error("Login failed. Please check your credentials.");
        }
    }, []);

    // logout function to de-authenticate user
    const logout = useCallback(() => {
        setIsAccount(null);
        setIsAuthenticated(false);

        // remove user info from localStorage        
        removeLocalStorageData();
        removeLocalStorageToken();
    }, []);

    // check if user is already authenticated
    useEffect(() => {
        const storedUser = getLocalStorageData();
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setIsAccount(parsedUser);
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            account: isAccount,
            isAuthenticated,
            login,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};