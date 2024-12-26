export interface SearchParams {
    page: number;
    limit: number;
    search: string;
}

export interface UseSearchProps<T> {
    onSearch: (params: T) => void;
    delay?: number;
    searchParams?: Partial<T>;
}