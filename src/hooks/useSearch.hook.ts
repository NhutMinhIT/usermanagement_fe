import { useCallback, useState } from 'react';
import { IUseSearchProps } from '../pages/UserManagementPage/types/searchType';
import { useDebounce } from './useDebounce.hook';
import { DELAY_DEBOUNCE_DEFAULT, SEARCH_PARAMS_DEFAULT } from './types';

export const useSearch = <T extends { search?: string }>({
    onSearch,
    delay = DELAY_DEBOUNCE_DEFAULT,
    searchParams = {} as Partial<T>
}: IUseSearchProps<T>) => {
    const [searchValue, setSearchValue] = useState<string>(SEARCH_PARAMS_DEFAULT);

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
    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value || '';
        setSearchValue(value);
        debouncedSearch(value);
    }, [debouncedSearch]);

    return {
        searchValue,
        handleSearchChange,
    };
};