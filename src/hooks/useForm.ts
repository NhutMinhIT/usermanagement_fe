import { useState } from 'react';

export const useForm = <T extends Record<string, any>>(
    initialFormData: T,
    validateForm: (formData: T) => Record<string, string>
) => {
    const [formData, setFormData] = useState<T>(initialFormData);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string | number): void => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlur = (field: string): void => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        const validationErrors = validateForm(formData);
        setErrors(validationErrors);
    };

    const handleSubmit = async (
        submitCallback: (formData: T) => Promise<void>
    ): Promise<void> => {
        const validationErrors = validateForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                setIsLoading(true);
                await submitCallback(formData);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return {
        formData,
        errors,
        touched,
        isLoading,
        setFormData,
        handleChange,
        handleSelectChange,
        handleBlur,
        handleSubmit,
    };
};
