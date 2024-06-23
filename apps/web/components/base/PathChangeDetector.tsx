'use client';

import { useEffect, useMemo } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface PathChangeDetectorProps {
    onPathChange: (path: string) => void;
}

function PathChangeDetector(props: PathChangeDetectorProps): null {
    const { onPathChange } = props;

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const path = useMemo(() => {
        return `${pathname}?${searchParams}`;
    }, [pathname, searchParams]);

    useEffect(() => {
        onPathChange(path);
    }, [path]);

    return null;
}

export default PathChangeDetector;
