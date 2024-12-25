import { Box } from "@mui/material";
import { FC } from "react";
import styles from "./modules/style.module.css";
import { LoginFormPropsType } from "../types/login.type";
import InputField from "../../../components/InputField/InputField";
import { Link } from "react-router-dom";
import ButtonLoading from "../../../components/Button/Button";

const LoginForm: FC<LoginFormPropsType> = ({
    isLoading,
    formData,
    error,
    handleSubmit,
    handleChange,
}) => {

    return (
        <Box
            component={"form"}
            onSubmit={handleSubmit}
            className={styles.box__form__login}
        >
            <InputField
                fullWidth
                variant="outlined"
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={!!error.username}
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
                error={!!error.password}
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
