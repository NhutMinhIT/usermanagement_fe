import { ICreateUser } from "../types/user-managment.type";


// Define validation errors interface
interface ValidationErrors {
    [key: string]: string; // Allow dynamic error keys mapping to error messages
}

export const validateUserForm = (data: ICreateUser): ValidationErrors => {
    const errors: ValidationErrors = {};

    // Validation rules
    if (!data.username?.trim()) {
        errors.username = 'Username is required';
    }

    if (!data.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.email = 'Invalid email format';
    }

    // Return collected errors
    return errors;
};
