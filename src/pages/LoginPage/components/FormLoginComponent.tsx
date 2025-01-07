import { Box, TextField } from "@mui/material";
import { FC, memo } from "react";
import styles from "./modules/style.module.css";
import { Link } from "react-router-dom";
import {
    FORGOT_PASSWORD,
    LOGIN_BUTTON_REGISTER,
    LOGIN_BUTTON_SUBMIT,
    LOGIN_BUTTON_SUBMIT_DATA_TESTID,
    LOGIN_FORM_PASSWORD_DATA_TESTID,
    LOGIN_FORM_PASSWORD_LABEL,
    LOGIN_FORM_PASSWORD_NAME,
    LOGIN_FORM_USERNAME_DATA_TESTID,
    LOGIN_FORM_USERNAME_LABEL,
    LOGIN_FORM_USERNAME_NAME
} from "../constant";
import { ILoginFormData } from "../types/loginType";
import { ButtonLoading } from "../../../components";

type TLoginFormProps = {
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

const LoginForm: FC<TLoginFormProps> = ({
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
            className={styles.box__form__login}
        >
            <TextField
                data-testid={LOGIN_FORM_USERNAME_DATA_TESTID}
                fullWidth
                variant="outlined"
                label={LOGIN_FORM_USERNAME_LABEL}
                name={LOGIN_FORM_USERNAME_NAME}
                value={formData.username}
                onChange={handleChange}
                onBlur={(e) => handleBlur && handleBlur(e)}
                error={touched?.username && !!error.username}
                helperText={error.username}
            />

            <TextField
                fullWidth
                data-testid={LOGIN_FORM_PASSWORD_DATA_TESTID}
                variant="outlined"
                label={LOGIN_FORM_PASSWORD_LABEL}
                name={LOGIN_FORM_PASSWORD_NAME}
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
                buttonText={LOGIN_BUTTON_SUBMIT}
                variant="contained"
                fullWidth
                className={styles.login__button}
                onClick={handleSubmit}
                data-testid={LOGIN_BUTTON_SUBMIT_DATA_TESTID}
            />
            <Box sx={{ mt: 2, textAlign: 'center', gap: 10, display: 'flex', justifyContent: 'center' }}>
                <Link
                    to={'#'}
                >
                    {LOGIN_BUTTON_REGISTER}
                </Link>

                <Link to="#" >
                    {FORGOT_PASSWORD}
                </Link>

            </Box>
        </Box>
    );
};

export default memo(LoginForm);
