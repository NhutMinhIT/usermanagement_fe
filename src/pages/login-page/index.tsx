import React, { FormEvent } from "react";
import { useAuth } from "../../context/auth/auth.context";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE, USER_MANAGEMENT_PAGE } from "../../constants/path.constant";
import LoginForm from "./components/form-login.component";
import styles from "./components/modules/style.module.css";
import { EUserRole } from "../../types/UserType";
import { Typography } from "@mui/material";
import { useForm } from "../../hooks/useForm";
import { ILoginFormData } from "./types/login.type";
import { validateLoginForm } from "./schema/login.schema";
import { LOGIN_ERROR_MESSAGE, LOGIN_TITLE } from "./constant";

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