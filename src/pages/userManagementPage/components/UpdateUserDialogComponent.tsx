import { FC, memo, useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Box,
} from "@mui/material";
import { IUpdateUser } from "../types/userManagmentType";
import { validateUpdateUser } from "../schemas/updateUserSchema";
import { useUserData } from "../../../hooks/useUserData.hook";
import { useForm } from "../../../hooks/useForm";
import { BUTTON_CANCEL_UPDATE_USER_DATA_TEST_ID, BUTTON_CANCEL_UPDATE_USER_TEXT, BUTTON_SUBMIT_UPDATE_USER_DATA_TEST_ID, BUTTON_SUBMIT_UPDATE_USER_TEXT, DIALOG_UPDATE_USER_DATA_TEST_ID, DIALOG_UPDATE_USER_TITLE, SELECT_ROLE_DATA_TESTID, SELECT_ROLE_LABEL, SELECT_ROLE_LABEL_ID, SELECT_ROLE_NAME, SELECT_ROLE_TITLE, TEXTFIELD_EMAIL_DATA_TESTID, TEXTFIELD_EMAIL_LABEL, TEXTFIELD_EMAIL_NAME, TEXTFIELD_FULLNAME_DATA_TESTID, TEXTFIELD_FULLNAME_LABEL, TEXTFIELD_FULLNAME_NAME, TEXTFIELD_USERNAME_DATA_TESTID, TEXTFIELD_USERNAME_LABEL, TEXTFIELD_USERNAME_NAME, USER_LOADING } from "../constant";
import { ROLE_OPTIONS } from "../../../constants/roleConstant";
import styles from "./module/style.module.css";
import { ButtonLoading, DialogTransition } from "../../../components";
type UpdateUserDialogComponentProps = {
    isOpen: boolean;
    onClose: () => void;
    userId: string | null;
    handleReloadUserData: () => void;
};

const initialFormData: IUpdateUser = {
    username: "",
    fullName: "",
    email: "",
    role: "",
};

const UpdateUserDialogComponent: FC<UpdateUserDialogComponentProps> = ({
    isOpen,
    onClose,
    userId,
    handleReloadUserData
}) => {
    const { handleUpdateUser, getUserDetails } = useUserData();
    const [loadingData, setLoadingData] = useState<boolean>(false);
    const {
        isLoading,
        errors,
        touched,
        formData,
        handleChange,
        handleBlur,
        handleSubmit,
        handleSelectChange,
        setFormData,
    } = useForm<IUpdateUser>(initialFormData, validateUpdateUser);
    useEffect(() => {
        if (!userId) return;

        const fetchUserDetail = async () => {
            setLoadingData(true);
            try {
                const userData = await getUserDetails(userId);
                setFormData({
                    username: userData.username || "",
                    fullName: userData.fullName || "",
                    email: userData.email || "",
                    role: userData.role || "",
                });
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoadingData(false);
            }
        };
        fetchUserDetail();
    }, [userId]);

    if (loadingData) {
        return (
            <Dialog open={isOpen} onClose={onClose}>
                <DialogTitle>{USER_LOADING}</DialogTitle>
            </Dialog>
        );
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleSubmit(async (data) => {
            if (!userId) return;
            try {
                await handleUpdateUser(userId, data);
                onClose();
                handleReloadUserData();
            } catch (error) {
                console.error("Error updating user:", error);
                window.alert("Failed to update user. Please try again.");
            }
        });
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            data-testid={DIALOG_UPDATE_USER_DATA_TEST_ID}
            fullWidth
            TransitionComponent={DialogTransition}
        >
            <DialogTitle>{DIALOG_UPDATE_USER_TITLE}</DialogTitle>
            <DialogContent>
                <Box component={"form"}
                    className={styles.form__update__user}
                    onSubmit={onSubmit}
                >
                    <TextField
                        data-testid={TEXTFIELD_USERNAME_DATA_TESTID}
                        fullWidth
                        margin="dense"
                        name={TEXTFIELD_USERNAME_NAME}
                        label={TEXTFIELD_USERNAME_LABEL}
                        value={formData.username?.trim()}
                        onChange={handleChange}
                        onBlur={() => handleBlur(TEXTFIELD_USERNAME_NAME)}
                        error={touched.username && Boolean(errors.username)}
                        helperText={touched.username && errors.username}
                    />
                    <TextField
                        data-testid={TEXTFIELD_FULLNAME_DATA_TESTID}
                        fullWidth
                        margin="dense"
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
                        margin="dense"
                        name={TEXTFIELD_EMAIL_NAME}
                        label={TEXTFIELD_EMAIL_LABEL}
                        value={formData.email?.trim()}
                        onChange={handleChange}
                        onBlur={() => handleBlur(TEXTFIELD_EMAIL_NAME)}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                    />

                    <TextField
                        data-testid={SELECT_ROLE_DATA_TESTID}
                        id="update-role"
                        select
                        label={SELECT_ROLE_TITLE}
                        value={formData.role}
                        onChange={(e) => handleSelectChange(SELECT_ROLE_NAME, e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={touched.role && Boolean(errors.role)}
                        helperText={touched.role && errors.role}
                    >
                        {Object.entries(ROLE_OPTIONS).map(([value, label]) => (
                            <MenuItem key={value} value={value} data-testid={value}>
                                {label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <ButtonLoading
                        type="submit"
                        buttonText={BUTTON_SUBMIT_UPDATE_USER_TEXT}
                        isLoading={isLoading}
                        fullWidth
                        disabled={isLoading}
                        variant="contained"
                        size="large"
                        data-testid={BUTTON_SUBMIT_UPDATE_USER_DATA_TEST_ID}
                        classes={styles.btn__update_user}
                    />
                    <Button
                        onClick={onClose}
                        disabled={isLoading}
                        data-testid={BUTTON_CANCEL_UPDATE_USER_DATA_TEST_ID}
                        size="large"
                        variant="contained"
                        color="error"
                        fullWidth
                        classes={styles.btn__cancel_update_user}
                    >
                        {BUTTON_CANCEL_UPDATE_USER_TEXT}
                    </Button>
                </Box>

            </DialogContent>
        </Dialog>
    );
};

export default memo(UpdateUserDialogComponent);