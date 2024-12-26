import { useState } from 'react';
import { UseSearchProps } from '../pages/user-management-page/types/search.type';
import { useDebounce } from './useDebounce.hook';

export const useSearch = <T extends { search?: string }>({
    onSearch,
    delay = 300,
    searchParams = {} as Partial<T>
}: UseSearchProps<T>) => {
    const [searchValue, setSearchValue] = useState('');

    const debouncedSearch = useDebounce(
        (value: string) => {
            onSearch({
                ...searchParams,
                search: value || undefined
            } as T);
        },
        delay,
        [searchParams, onSearch] // Added missing dependencies array
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value || '';
        setSearchValue(value);
        debouncedSearch(value);
    };

    return {
        searchValue,
        handleSearchChange,
    };
};