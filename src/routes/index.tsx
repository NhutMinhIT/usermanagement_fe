import { Navigate, Route, Routes } from "react-router-dom";
import { EUserRole } from "../types/userType";
import { useAuth } from "../context/auth/AuthContext";
import { HOME_PAGE, LOGIN_PAGE, ROOT_PAGE, USER_MANAGEMENT_PAGE } from "../constants/pathConstant";
import UserManagementPage from "../pages/UserManagementPage";
import HomePage from "../pages/HomePage";
import React, { useCallback } from "react";
import LoginPage from "../pages/LoginPage";

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
        <React.Fragment>
            <Route path={ROOT_PAGE} element={<Navigate to={HOME_PAGE} replace />} />
            <Route path={LOGIN_PAGE} element={<LoginPage />} />
            <Route path="*" element={<Navigate to={LOGIN_PAGE} replace />} />
        </React.Fragment>
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
            {account === null ? (
                renderNoRoleRoutes()

            ) : (
                renderRoutes()

            )}
        </Routes>
    );
};

export default AppRoutes;