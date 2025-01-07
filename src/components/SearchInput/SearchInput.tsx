import { TextField } from '@mui/material';
import React, { memo } from 'react';

interface ISearchInputProps {
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    value?: string;
    className?: string;
}
const SearchInput: React.FC<ISearchInputProps> = ({
    onSearch,
    placeholder = 'Search...',
    value,
    className
}) => {
    return (
        <TextField
            onChange={onSearch}
            placeholder={placeholder}
            value={value}
            className={className}
        />
    );
};
export default memo(SearchInput);