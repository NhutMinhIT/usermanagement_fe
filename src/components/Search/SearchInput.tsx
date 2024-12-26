import React from 'react';
import InputField from '../InputField/InputField';

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
        <InputField
            onChange={onSearch}
            placeholder={placeholder}
            value={value}
        />
    );
};