import React from "react";
import { AuthProvider } from "./auth/auth.context";


export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
};
