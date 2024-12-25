import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/login-page";
import { HOME_PAGE, LOGIN_PAGE, ROOT_PAGE, USER_MANAGEMENT_PAGE } from "../constants/path.constant";
import { useAuth } from "../context/auth/auth.context";
import UserManagementPage from "../pages/user-management-page";
import HomePage from "../pages/home-page/home.page";
import { EUserRole } from "../types/user.type";

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