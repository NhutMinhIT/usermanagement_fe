import { useCallback, useRef, useEffect } from 'react';

export const useDebounce = <T extends (...args: any[]) => void>(
    func: T,
    wait: number,
    deps: any[]
) => {
    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return useCallback(
        (...args: Parameters<T>) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                func(...args);
            }, wait);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        deps
    );
};