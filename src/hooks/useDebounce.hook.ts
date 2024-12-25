import { useCallback, useRef, useEffect } from 'react';

function debounce<T extends (...args: any[]) => void>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout | undefined;

    return function (this: any, ...args: Parameters<T>): void {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}

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