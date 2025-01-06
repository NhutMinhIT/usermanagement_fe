import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import Transition from "./dialog-transition"
import { FC, memo } from "react";
import ButtonLoading from "../Button/Button";
import { DIALOG_CANCEL_BUTTON_TEXT, DIALOG_CONFIRM_BUTTON_TEXT } from "./constant";

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
                    buttonText={DIALOG_CONFIRM_BUTTON_TEXT}
                />
                <Button
                    onClick={onClose}
                    color="error"
                    variant="contained"
                >
                    {DIALOG_CANCEL_BUTTON_TEXT}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default memo(ConfirmDialog);
