import { useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

function useSetSearchParam() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return useCallback(
        (name: string, value: string | number | null) => {
            const newSearchParams = new URLSearchParams(
                Array.from(searchParams.entries())
            );

            if (typeof value === 'string') {
                newSearchParams.set(name, value);
            } else if (typeof value === 'number') {
                newSearchParams.set(name, value.toString());
            } else {
                newSearchParams.delete(name);
            }

            router.replace(`${pathname}?${newSearchParams}`, { scroll: false });
        },
        [router, pathname, searchParams]
    );
}

export default useSetSearchParam;
