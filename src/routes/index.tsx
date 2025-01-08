import { Navigate, Route, Routes } from "react-router-dom";
import { EUserRole } from "../types/userType";
import { useAuth } from "../context/auth/AuthContext";
import { HOME_PAGE, LOGIN_PAGE, ROOT_PAGE, USER_MANAGEMENT_PAGE } from "../constants/pathConstant";
import UserManagementPage from "../pages/UserManagementPage";
import HomePage from "../pages/HomePage";
import React, { useCallback } from "react";

const AppRoutes = () => {
    const { account } = useAuth();

    // User role-based access
    const isAdmin = account?.user?.role === EUserRole.ADMIN;
    const isUser = account?.user?.role === EUserRole.USER;

    const renderAdminRoutes = () => (
        <>
            <Route path={USER_MANAGEMENT_PAGE} element={<UserManagementPage />} />
            <Route path="*" element={<Navigate to={USER_MANAGEMENT_PAGE} replace />} />

        </>
    )

    const renderUserRoutes = () => (
        <React.Fragment>
            <Route path={HOME_PAGE} element={<HomePage />} />
            <Route path="*" element={<Navigate to={HOME_PAGE} replace />} />
        </React.Fragment>
    )

    const renderNoRoleRoutes = () => (
        <Route path="*" element={<Navigate to={LOGIN_PAGE} replace />} />
    )

    const renderRoutes = useCallback(() => {
        if (isAdmin) {
            return renderAdminRoutes();
        } else if (isUser) {
            return renderUserRoutes();
        } else {
            return renderNoRoleRoutes();
        }
    }, [isAdmin, isUser]);

    return (
        <Routes>
            {account !== null ? (
                renderRoutes()
            ) : (
                <Route path="*" element={<Navigate to={ROOT_PAGE} replace />} />
            )}
        </Routes>
    );
};

export default AppRoutes;