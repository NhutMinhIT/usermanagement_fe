import { LOGIN_FORM_PASSWORD_REQUIRED, LOGIN_FORM_USERNAME_REQUIRED } from "../constant";
import { ILoginFormData } from "../types/login.type";

interface ValidationErrors {
    [key: string]: string;
}

export const validateLoginForm = (data: ILoginFormData): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!data.username?.trim()) {
        errors.username = LOGIN_FORM_USERNAME_REQUIRED;
    }

    if (!data.password) {
        errors.password = LOGIN_FORM_PASSWORD_REQUIRED;
    }

    return errors;
}