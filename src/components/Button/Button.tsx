import { Button, CircularProgress, ButtonProps } from "@mui/material";
import React from "react";

interface CustomButtonProps extends ButtonProps {
    isLoading: boolean;
    buttonText?: string;
}

const ButtonLoading: React.FC<CustomButtonProps> = ({
    isLoading,
    buttonText,
    className,
    ...props
}) => {
    return (
        <Button
            className={className}
            {...props}
        >
            {isLoading ? (
                <CircularProgress size={24} color="inherit" />
            ) : (
                buttonText
            )}
        </Button>
    );
};

export default ButtonLoading;