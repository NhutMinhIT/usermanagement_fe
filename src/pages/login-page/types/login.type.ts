export type ILoginFormData = {
    username: string;
    password: string;
}

export type IErrorLoginForm = {
    username: string;
    password: string;
}

export type LoginFormPropsType = {
    isLoading: boolean
    formData: ILoginFormData
    error: IErrorLoginForm
    handleSubmit: (e: React.FormEvent) => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
