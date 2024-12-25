import { IErrorLoginForm, ILoginFormData } from "../types/login.type";

const validateForm = (
    formData: ILoginFormData,
    setErrors: (errors: IErrorLoginForm) => void
): boolean => {
    let valid = true;
    const newErrors: IErrorLoginForm = { username: "", password: "" };

    // Validate Username
    if (!formData.username.trim()) {
        newErrors.username = "Username is required";
        valid = false;
    }

    // Validate Password
    if (!formData.password.trim()) {
        newErrors.password = "Password is required";
        valid = false;
    }

    setErrors(newErrors);
    return valid;
};

export default validateForm;
