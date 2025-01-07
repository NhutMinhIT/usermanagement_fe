import { useCallback, useState } from 'react';
import { IUseSearchProps } from '../pages/UserManagementPage/types/searchType';
import { useDebounce } from './useDebounce.hook';

export const useSearch = <T extends { search?: string }>({
    onSearch,
    delay = 300,
    searchParams = {} as Partial<T>
}: IUseSearchProps<T>) => {
    const [searchValue, setSearchValue] = useState<string>('');

    const debouncedSearch = useDebounce(
        (value: string): void => {
            onSearch({
                ...searchParams,
                search: value || undefined
            } as T);
        },
        delay,
        [searchParams, onSearch] // Added missing dependencies array
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value || '';
        setSearchValue(value);
        debouncedSearch(value);
    };
    // const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    //     const value = e.target.value || '';
    //     setSearchValue(value);
    //     debouncedSearch(value);
    // }, [debouncedSearch]);

    return {
        searchValue,
        handleSearchChange,
    };
};