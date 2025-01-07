import React from "react";
import { AuthProvider } from "./auth/AuthContext";


export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
};
