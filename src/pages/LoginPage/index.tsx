import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./components/modules/style.module.css";
import { EUserRole } from "../../types/userType";
import { Typography } from "@mui/material";
import { useForm } from "../../hooks/useForm";
import { LOGIN_ERROR_MESSAGE, LOGIN_TITLE } from "./constant";
import { useAuth } from "../../context/auth/AuthContext";
import { ILoginFormData } from "./types/loginType";
import { validateLoginForm } from "./schema/loginSchema";
import { HOME_PAGE, USER_MANAGEMENT_PAGE } from "../../constants/pathConstant";
import LoginForm from "./components/FormLoginComponent";
const initialFormData = {
    username: "",
    password: "",
};

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login, account } = useAuth();

    // Form login
    const {
        isLoading,
        errors,
        touched,
        formData,
        handleBlur,
        handleChange,
        // handleSubmit
    } = useForm<ILoginFormData>(initialFormData, validateLoginForm);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(formData.username, formData.password);
            if (account && account.user.role === EUserRole.ADMIN) {
                navigate(USER_MANAGEMENT_PAGE);
            } else if (account && account.user.role === EUserRole.USER) {
                navigate(HOME_PAGE);
            }
        } catch (error) {
            console.error(`${LOGIN_ERROR_MESSAGE}`, error);
        }
    }

    return (
        <div
            className={styles.login__page}
        >
            <Typography
                variant="h3"
                align="center"
                color="primary"
                gutterBottom
                fontWeight="bold"
            >
                {LOGIN_TITLE}
            </Typography>

            <LoginForm
                isLoading={isLoading}
                formData={formData}
                error={errors}
                touched={touched}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleBlur={handleBlur}
            />
        </div>
    );
};

export default LoginPage;