import { FC, useEffect, useState } from "react";
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
} from "@mui/material";
import { IUpdateUser } from "../types/user-managment.type";
import { ROLE_OPTIONS } from "../../../constants/role.constant";
import { validateUpdateUser } from "../schemas/update-user-schema";
import { useUserData } from "../../../hooks/useUserData.hook";
import { useForm } from "../../../hooks/useForm";

type UpdateUserDialogComponentProps = {
    isOpen: boolean;
    onClose: () => void;
    handleReloadUserData: () => void;
    userId: string | null;
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
    handleReloadUserData,
    userId,
}) => {
    const { handleUpdateUser, getUserDetails } = useUserData();
    const [loadingData, setLoadingLoading] = useState<boolean>(false);
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
            setLoadingLoading(true);
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
                setLoadingLoading(false);
            }
        };
        fetchUserDetail();
    }, [userId]);

    if (loadingData) {
        return (
            <Dialog open={isOpen} onClose={onClose}>
                <DialogTitle>Loading...</DialogTitle>
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
        <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Update User</DialogTitle>
            <form onSubmit={onSubmit}>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="dense"
                        name="username"
                        label="Username"
                        value={formData.username?.trim()}
                        onChange={handleChange}
                        onBlur={() => handleBlur('username')}
                        error={touched.username && Boolean(errors.username)}
                        helperText={touched.username && errors.username}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        name="fullName"
                        label="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        onBlur={() => handleBlur('fullName')}
                        error={touched.fullName && Boolean(errors.fullName)}
                        helperText={touched.fullName && errors.fullName}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        name="email"
                        label="Email"
                        value={formData.email?.trim()}
                        onChange={handleChange}
                        onBlur={() => handleBlur('email')}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="role-label">Select Role</InputLabel>
                        <Select
                            labelId="role-label"
                            label="Select Role"
                            name="role"
                            value={formData.role}
                            onChange={(e) => handleSelectChange('role', e.target.value)}
                            onBlur={() => handleBlur('role')}
                            error={touched.role && Boolean(errors.role)}
                        >
                            {ROLE_OPTIONS.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={isLoading}
                    >
                        {isLoading ? "Updating..." : "Update"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default UpdateUserDialogComponent;