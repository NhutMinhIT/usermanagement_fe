import { Box } from "@mui/material";
import { FC } from "react";
import styles from "./modules/style.module.css";
import InputField from "../../../components/InputField/InputField";
import { Link } from "react-router-dom";
import ButtonLoading from "../../../components/Button/Button";
import { ILoginFormData } from "../types/login.type";

type LoginFormPropsType = {
    isLoading: boolean;
    formData: ILoginFormData;
    error: {
        username?: string;
        password?: string;
    };
    touched?: {
        username?: boolean;
        password?: boolean;
    };
    handleSubmit: (e: any) => void;
    handleChange: (e: any) => void;
    handleBlur?: (e: any) => void;
};

const LoginForm: FC<LoginFormPropsType> = ({
    isLoading,
    formData,
    error,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
}) => {

    return (
        <Box
            data-testid="login-form"
            component={"form"}
            onSubmit={handleSubmit}
            className={styles.box__form__login}
        >
            <InputField
                fullWidth
                variant="outlined"
                label="Username"
                name="username-error"
                value={formData.username}
                onChange={handleChange}
                onBlur={(e) => handleBlur && handleBlur(e)}
                error={touched?.username && !!error.username}
                helperText={error.username}
            />

            <InputField
                fullWidth
                variant="outlined"
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={(e) => handleBlur && handleBlur(e)}
                error={touched?.password && !!error.password}
                helperText={error.password}
            />

            <ButtonLoading
                size="large"
                isLoading={isLoading}
                buttonText="Login"
                variant="contained"
                fullWidth
                type="submit"
                className={styles.login__button}
            />
            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Link
                    to={'#'}
                >
                    Forgot Password?
                </Link>
                <Box mt={1}>
                    <Link to="#">
                        Don't have an account? Sign Up
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginForm;
