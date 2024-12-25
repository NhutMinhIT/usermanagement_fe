import { FC, useState, useEffect, ChangeEvent, FormEvent } from "react";
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
    SelectChangeEvent,
} from "@mui/material";
import { IUpdateUser } from "../types/user-managment.type";
import { ROLE_OPTIONS } from "../../../constants/role.constant";
import { validateUpdateUser } from "../schemas/update-user-schema";
import { useUserManagementContext } from "../context/user-management.context";

type UpdateUserDialogComponentProps = {
    isOpen: boolean;
    onClose: () => void;
    // handleReloadUserData: () => void;
    userId: string | null;
};

const UpdateUserDialogComponent: FC<UpdateUserDialogComponentProps> = ({
    isOpen,
    onClose,
    // handleReloadUserData,
    userId,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const { getUserById, updateUser } = useUserManagementContext();
    const [formData, setFormData] = useState<IUpdateUser>({
        username: "",
        fullName: "",
        email: "",
        role: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        const validationErrors = validateUpdateUser(formData);
        setErrors(validationErrors);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userId) return;

        const validationErrors = validateUpdateUser(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setIsLoading(true);
            await updateUser(userId, formData);
            window.alert("User updated successfully");
            // handleReloadUserData();
            onClose();
            setFormData({ username: "", fullName: "", email: "", role: "" });
        } catch (error: any) {
            const backendError = error.response?.data?.message;
            window.alert(backendError || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!userId) return;

        const fetchUser = async () => {
            try {
                setIsLoading(true);
                const fetchedUser = await getUserById(userId);
                setFormData({
                    username: fetchedUser.username || "",
                    fullName: fetchedUser.fullName || "",
                    email: fetchedUser.email || "",
                    role: fetchedUser.role || "",
                });
            } catch (error: any) {
                console.error("Failed to fetch user:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [userId, getUserById]);

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Update User</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="dense"
                        name="username"
                        label="Username"
                        value={formData.username}
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('fullName')}
                        error={touched.fullName && Boolean(errors.fullName)}
                        helperText={touched.fullName && errors.fullName}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        name="email"
                        label="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('email')}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                    />
                    <FormControl fullWidth required>
                        <InputLabel id="role-label">Select Role</InputLabel>
                        <Select
                            labelId="role-label"
                            label="Select Role"
                            name="role"
                            value={formData.role}
                            onChange={handleSelectChange}
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