import { useMemo } from 'react';
import useRouterQuery from '@/hooks/router/useRouterQuery';

function useActiveSlideIndex() {
    const { page } = useRouterQuery<{ page?: number }>();

    return useMemo(() => {
        return !!page ? Number(page) - 1 : 0;
    }, [page]);
}

export default useActiveSlideIndex;
