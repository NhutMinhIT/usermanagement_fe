import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";
import { EUserRole } from "../types/userType";
import { HOME_PAGE, LOGIN_PAGE, ROOT_PAGE, USER_MANAGEMENT_PAGE } from "../constants/pathConstant";
import LoginPage from "../pages/LoginPage";
import UserManagementPage from "../pages/UserManagementPage";
import HomePage from "../pages/HomePage";

const AppRoutes = () => {
    const { account } = useAuth();

    // User role-based access
    const isAdmin = account?.user?.role === EUserRole.ADMIN;
    const isUser = account?.user?.role === EUserRole.USER;

    return (
        <Routes>
            {account === null ? (
                <>
                    <Route path={ROOT_PAGE} element={<Navigate to={LOGIN_PAGE} replace />} />
                    <Route path={LOGIN_PAGE} element={<LoginPage />} />
                    <Route path="*" element={<Navigate to={LOGIN_PAGE} replace />} />
                </>
            ) : (
                <>
                    {isAdmin && (
                        <>
                            <Route path={USER_MANAGEMENT_PAGE} element={<UserManagementPage />} />
                            <Route path="*" element={<Navigate to={USER_MANAGEMENT_PAGE} replace />} />
                        </>
                    )}
                    {isUser && (
                        <>
                            <Route path={HOME_PAGE} element={<HomePage />} />
                            <Route path="*" element={<Navigate to={HOME_PAGE} replace />} />
                        </>
                    )}
                    {!isAdmin && !isUser && (
                        <Route path="*" element={<Navigate to={LOGIN_PAGE} replace />} />
                    )}
                </>
            )}
        </Routes>
    );
};

export default AppRoutes;