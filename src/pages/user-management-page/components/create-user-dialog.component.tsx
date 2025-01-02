import { FC, FormEvent } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useForm } from "../../../hooks/useForm";
import { validateUserForm } from '../schemas/create-user-schema';
import { ICreateUser } from "../types/user-managment.type";
import { ROLE_OPTIONS } from "../../../constants/role.constant";
import InputField from "../../../components/InputField/InputField";
import ButtonLoading from "../../../components/Button/Button";
import Transition from "./module/dialog-transition";
import styles from './module/style.module.css';
import { useUserData } from "../../../hooks/useUserData.hook";

const initialFormData: ICreateUser = {
    username: '',
    fullName: '',
    email: '',
    password: '',
    role: ''
};
type CreateUserDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    handleReloadUserData: () => void;
}

const CreateUserDialog: FC<CreateUserDialogProps> = ({ isOpen, onClose, handleReloadUserData }) => {
    const { handleCreateUser } = useUserData();
    const {
        formData,
        errors,
        touched,
        isLoading,
        handleChange,
        handleSelectChange,
        handleBlur,
        handleSubmit,
        setFormData
    } = useForm(initialFormData, validateUserForm);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleSubmit(async (data) => {
            try {
                await handleCreateUser(data);
                onClose();
                setFormData(initialFormData);
                handleReloadUserData();
            } catch (error) {
                console.error('Error creating user:', error);
                window.alert('Failed to create user. Please try again.');
            }
        });
    };

    return (
        <Dialog
            data-testid="create-user-form"
            open={isOpen}
            onClose={onClose}
            TransitionComponent={Transition}
            fullWidth
            className={styles.create__user__dialog}
        >
            <DialogTitle>Create New User</DialogTitle>
            <DialogContent>
                <Box
                    data-testid="test"
                    component="form"
                    onSubmit={onSubmit}
                    className={styles.form__create__user}
                >
                    <InputField
                        data-testid="username"
                        fullWidth
                        name="username"
                        label="Username"
                        value={formData.username.trim()}
                        onChange={handleChange}
                        onBlur={() => handleBlur('username')}
                        error={touched.username && Boolean(errors.username)}
                        helperText={touched.username && errors.username}
                    />
                    <InputField
                        data-testid="fullName"
                        fullWidth
                        name="fullName"
                        label="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        onBlur={() => handleBlur('fullName')}
                        error={touched.fullName && Boolean(errors.fullName)}
                        helperText={touched.fullName && errors.fullName}
                    />
                    <InputField
                        data-testid="email"
                        fullWidth
                        name="email"
                        label="Email"
                        value={formData.email.trim()}
                        onChange={handleChange}
                        onBlur={() => handleBlur('email')}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                    />
                    <InputField
                        data-testid="password"
                        fullWidth
                        name="password"
                        type="password"
                        label="Password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={() => handleBlur('password')}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                    />
                    <FormControl fullWidth required
                    >
                        <InputLabel id="role-label">Select Role</InputLabel>
                        <Select
                            id="role"
                            // data-testid="role"
                            labelId="role-label"
                            label="Select Role"
                            name="role"
                            value={formData.role}
                            onChange={(e) => handleSelectChange('role', e.target.value)}
                            onBlur={() => handleBlur('role')}
                            error={touched.role && Boolean(errors.role)}
                        >
                            {ROLE_OPTIONS.map((option) => (
                                <MenuItem key={option.value} value={option.value} data-testid={option}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <ButtonLoading
                        type="submit"
                        buttonText="Create User"
                        isLoading={isLoading}
                        fullWidth
                        disabled={isLoading}
                        variant="contained"
                        className={styles.button__create__user}
                        size="large"
                        data-testid="submit-create-user-form"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={onClose}
                        className={styles.button__cancel__create__user}
                        data-testid="close-create-user-dialog"
                        size="large"
                        color="error"
                    >
                        Cancel
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default CreateUserDialog;