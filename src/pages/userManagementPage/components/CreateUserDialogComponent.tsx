import { FC, FormEvent, memo } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useForm } from "../../../hooks/useForm";
import { validateUserForm } from '../schemas/createUserSchema';
import { ICreateUser } from "../types/userManagmentType";
import { ROLE_OPTIONS } from "../../../constants/role.constant";
import ButtonLoading from "../../../components/Button/Button";
import Transition from "../../../components/Dialog/dialog-transition";
import styles from './module/style.module.css';
import { useUserData } from "../../../hooks/useUserData.hook";
import { BUTTON_CANCEL_CREATE_USER_DATA_TEST_ID, BUTTON_CANCEL_CREATE_USER_TEXT, BUTTON_SUBMIT_CREATE_USER_DATA_TEST_ID, BUTTON_SUBMIT_CREATE_USER_TEXT, DIALOG_CREATE_USER_DATA_TEST_ID, DIALOG_CREATE_USER_TITLE, SELECT_ROLE_DATA_TESTID, SELECT_ROLE_LABEL, SELECT_ROLE_LABEL_ID, SELECT_ROLE_NAME, SELECT_ROLE_TITLE, TEXTFIELD_EMAIL_DATA_TESTID, TEXTFIELD_EMAIL_LABEL, TEXTFIELD_EMAIL_NAME, TEXTFIELD_FULLNAME_DATA_TESTID, TEXTFIELD_FULLNAME_LABEL, TEXTFIELD_FULLNAME_NAME, TEXTFIELD_PASSWORD_DATA_TESTID, TEXTFIELD_PASSWORD_LABEL, TEXTFIELD_PASSWORD_NAME, TEXTFIELD_USERNAME_DATA_TESTID, TEXTFIELD_USERNAME_LABEL, TEXTFIELD_USERNAME_NAME } from "../constant";

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
                window.alert('Failed to create user. Please try again.');
            }
        });
    };

    return (
        <Dialog
            data-testid={DIALOG_CREATE_USER_DATA_TEST_ID}
            open={isOpen}
            onClose={onClose}
            TransitionComponent={Transition}
            fullWidth
            className={styles.create__user__dialog}
        >
            <DialogTitle>{DIALOG_CREATE_USER_TITLE}</DialogTitle>
            <DialogContent>
                <Box
                    data-testid="test"
                    component="form"
                    onSubmit={onSubmit}
                    className={styles.form__create__user}
                >
                    <TextField
                        data-testid={TEXTFIELD_USERNAME_DATA_TESTID}
                        fullWidth
                        name={TEXTFIELD_USERNAME_NAME}
                        label={TEXTFIELD_USERNAME_LABEL}
                        value={formData.username.trim()}
                        onChange={handleChange}
                        onBlur={() => handleBlur(TEXTFIELD_USERNAME_NAME)}
                        error={touched.username && Boolean(errors.username)}
                        helperText={touched.username && errors.username}
                    />
                    <TextField
                        data-testid={TEXTFIELD_FULLNAME_DATA_TESTID}
                        fullWidth
                        name={TEXTFIELD_FULLNAME_NAME}
                        label={TEXTFIELD_FULLNAME_LABEL}
                        value={formData.fullName}
                        onChange={handleChange}
                        onBlur={() => handleBlur(TEXTFIELD_FULLNAME_NAME)}
                        error={touched.fullName && Boolean(errors.fullName)}
                        helperText={touched.fullName && errors.fullName}
                    />
                    <TextField
                        data-testid={TEXTFIELD_EMAIL_DATA_TESTID}
                        fullWidth
                        name={TEXTFIELD_EMAIL_NAME}
                        label={TEXTFIELD_EMAIL_LABEL}
                        value={formData.email.trim()}
                        onChange={handleChange}
                        onBlur={() => handleBlur(TEXTFIELD_EMAIL_NAME)}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                    />
                    <TextField
                        data-testid={TEXTFIELD_PASSWORD_DATA_TESTID}
                        fullWidth
                        name={TEXTFIELD_PASSWORD_NAME}
                        type="password"
                        label={TEXTFIELD_PASSWORD_LABEL}
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={() => handleBlur(TEXTFIELD_PASSWORD_NAME)}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                    />
                    <FormControl fullWidth required
                    >
                        <InputLabel id={SELECT_ROLE_LABEL_ID}>{SELECT_ROLE_TITLE}</InputLabel>
                        <Select
                            id="role"
                            data-testid={SELECT_ROLE_DATA_TESTID}
                            labelId={SELECT_ROLE_LABEL_ID}
                            label={SELECT_ROLE_LABEL}
                            name={SELECT_ROLE_NAME}
                            value={formData.role}
                            onChange={(e) => handleSelectChange(SELECT_ROLE_NAME, e.target.value)}
                            onBlur={() => handleBlur(SELECT_ROLE_NAME)}
                            error={touched.role && Boolean(errors.role)}
                        >
                            {Object.entries(ROLE_OPTIONS).map(([value, label]) => (
                                <MenuItem key={value} value={value} data-testid={value}>
                                    {label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <ButtonLoading
                        type="submit"
                        buttonText={BUTTON_SUBMIT_CREATE_USER_TEXT}
                        isLoading={isLoading}
                        fullWidth
                        disabled={isLoading}
                        variant="contained"
                        className={styles.button__create__user}
                        size="large"
                        data-testid={BUTTON_SUBMIT_CREATE_USER_DATA_TEST_ID}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={onClose}
                        className={styles.button__cancel__create__user}
                        data-testid={BUTTON_CANCEL_CREATE_USER_DATA_TEST_ID}
                        size="large"
                        color="error"
                    >
                        {BUTTON_CANCEL_CREATE_USER_TEXT}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default memo(CreateUserDialog);