import { Button, CircularProgress, ButtonProps } from "@mui/material";
import React, { memo } from "react";

interface ICustomButtonProps extends ButtonProps {
    isLoading: boolean;
    buttonText?: string;
}

const ButtonLoading: React.FC<ICustomButtonProps> = ({
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

export default memo(ButtonLoading);