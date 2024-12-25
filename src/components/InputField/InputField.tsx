import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
        borderRadius: '8px',
        backgroundColor: theme.palette.background.paper,
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.grey[800],
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
    },
    '& .MuiInputLabel-root': {
        color: theme.palette.text.secondary,
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: theme.palette.secondary.main,
    },
}));

type CustomTextInputProps = TextFieldProps;

const InputField: React.FC<CustomTextInputProps> = (props) => {
    return (
        <StyledTextField
            variant="outlined"
            fullWidth
            {...props}
        />
    );
};

export default InputField;