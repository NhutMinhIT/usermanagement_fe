import React, { useState } from "react";
import { useAuth } from "../../context/auth/auth.context";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE, USER_MANAGEMENT_PAGE } from "../../constants/path.constant";
import LoginForm from "./components/form-login.component";
import styles from "./components/modules/style.module.css";
import { EUserRole } from "../../types/user.type";
import { Typography } from "@mui/material";
import validateForm from "./schema/login.schema";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login, account } = useAuth();

    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState({ username: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError({ username: '', password: '' });

        if (!validateForm(formData, setError)) {
            setIsLoading(false);
            return;
        }

        try {
            await login(formData.username, formData.password).then(() => {
                setFormData({ username: "", password: "" });
            });
            if (account && account.user.role === EUserRole.ADMIN) {
                navigate(USER_MANAGEMENT_PAGE);
            } else if (account && account.user.role === EUserRole.USER) {
                navigate(HOME_PAGE);
            }
        } catch (err: any) {
            setError({ username: err.message, password: '' });
        } finally {
            setIsLoading(false);
        }
    };

    //handle onChange
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

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
                Login
            </Typography>

            <LoginForm
                isLoading={isLoading}
                formData={formData}
                error={error}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
            />
        </div>
    );
};

export default LoginPage;