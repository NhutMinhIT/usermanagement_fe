import { TextField } from '@mui/material';
import React from 'react';

interface SearchInputProps {
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    value?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
    onSearch,
    placeholder = 'Search...',
    value
}) => {
    return (
        <TextField
            onChange={onSearch}
            placeholder={placeholder}
            value={value}
        />
    );
};