import React from "react";
import { AuthProvider } from "./auth/auth.context";
import { UserProvider } from "../pages/user-management-page/context/user-management.context";


export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <AuthProvider>
            <UserProvider>
                {children}
            </UserProvider>
        </AuthProvider>
    );
};
