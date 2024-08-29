'use client';

import { useSearchParams } from 'next/navigation';

function useRouterQuery<T>(): T {
    const searchParams = useSearchParams();

    // if (typeof window === 'undefined') {
    //     return null;
    // }

    return Object.fromEntries(searchParams.entries()) as T;
}

export default useRouterQuery;
