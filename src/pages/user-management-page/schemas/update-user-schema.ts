import { EMAIL_REGEX, ERROR_EMAIL_INVALID_FORMAT, ERROR_EMAIL_REQUIRED, ERROR_FULLNAME_MAX_LENGTH, ERROR_FULLNAME_MIN_LENGTH, ERROR_FULLNAME_REQUIRED, ERROR_INVALID_ROLE, ERROR_ROLE_REQUIRED, ERROR_USERNAME_MAX_LENGTH, ERROR_USERNAME_MIN_LENGTH, ERROR_USERNAME_REQUIRED, VALID_ROLES } from "../constant";
import { IUpdateUser } from "../types/user-managment.type";

interface ValidationErrors {
    [key: string]: string;
}

export const validateUpdateUser = (data: IUpdateUser): ValidationErrors => {
    const errors: ValidationErrors = {};

    // Username validation
    if (!data.username) {
        errors.username = ERROR_USERNAME_REQUIRED;
    } else if (data.username.length < 3) {
        errors.username = ERROR_USERNAME_MIN_LENGTH
    } else if (data.username.length > 50) {
        errors.username = ERROR_USERNAME_MAX_LENGTH;
    }

    // Full name validation
    if (!data.fullName) {
        errors.fullName = ERROR_FULLNAME_REQUIRED;
    } else if (data.fullName.length < 2) {
        errors.fullName = ERROR_FULLNAME_MIN_LENGTH;
    } else if (data.fullName.length > 50) {
        errors.fullName = ERROR_FULLNAME_MAX_LENGTH;
    }

    // Email validation
    const emailRegex = EMAIL_REGEX
    if (!data.email) {
        errors.email = ERROR_EMAIL_REQUIRED;
    } else if (!emailRegex.test(data.email)) {
        errors.email = ERROR_EMAIL_INVALID_FORMAT
    }

    // Role validation
    const validRoles = VALID_ROLES;
    if (!data.role) {
        errors.role = ERROR_ROLE_REQUIRED;
    } else if (!validRoles.includes(data.role)) {
        errors.role = ERROR_INVALID_ROLE;
    }

    return errors;
};