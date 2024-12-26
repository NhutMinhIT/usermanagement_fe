import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import Transition from "../../pages/user-management-page/components/module/dialog-transition"
import { FC } from "react";
import ButtonLoading from "../Button/Button";

type ConfirmDialogProps = {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    onApprove: () => void;
    isLoading: boolean;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
    title,
    isOpen,
    onClose,
    onApprove,
    isLoading
}) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            TransitionComponent={Transition}
            fullWidth
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
            </DialogContent>
            <DialogActions>
                <ButtonLoading
                    onClick={onApprove}
                    color="primary"
                    variant="outlined"
                    isLoading={isLoading}
                    buttonText="Confirm"
                />
                <Button
                    onClick={onClose}
                    color="error"
                    variant="contained"
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog
