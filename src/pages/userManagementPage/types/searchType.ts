export interface ISearchParams {
    page: number;
    limit: number;
    search: string;
}

export interface IUseSearchProps<T> {
    onSearch: (params: T) => void;
    delay?: number;
    searchParams?: Partial<T>;
}