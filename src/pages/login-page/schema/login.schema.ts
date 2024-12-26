import { ILoginFormData } from "../types/login.type";

interface ValidationErrors {
    [key: string]: string;
}

export const validateLoginForm = (data: ILoginFormData): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!data.username?.trim()) {
        errors.username = 'Username is required';
    }

    if (!data.password) {
        errors.password = 'Password is required';
    }

    return errors;
}