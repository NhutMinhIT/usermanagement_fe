import { IUpdateUser } from "../types/user-managment.type";

interface ValidationErrors {
    [key: string]: string;
}

export const validateUpdateUser = (data: IUpdateUser): ValidationErrors => {
    const errors: ValidationErrors = {};

    // Username validation
    if (!data.username) {
        errors.username = 'Username is required';
    } else if (data.username.length < 3) {
        errors.username = 'Username must be at least 3 characters';
    } else if (data.username.length > 50) {
        errors.username = 'Username must not exceed 50 characters';
    }

    // Full name validation
    if (!data.fullName) {
        errors.fullName = 'Full name is required';
    } else if (data.fullName.length < 2) {
        errors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!data.email) {
        errors.email = 'Email is required';
    } else if (!emailRegex.test(data.email)) {
        errors.email = 'Invalid email format';
    }

    // Role validation
    const validRoles = ['admin', 'manager', 'staff', 'user'];
    if (!data.role) {
        errors.role = 'Role is required';
    } else if (!validRoles.includes(data.role)) {
        errors.role = 'Invalid role';
    }

    return errors;
};