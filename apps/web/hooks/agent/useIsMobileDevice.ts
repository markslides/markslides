import { useMemo } from 'react';

function useIsMobileDevice() {
    const { userAgent } = navigator;

    return useMemo(() => {
        return (
            userAgent &&
            Boolean(
                userAgent.match(
                    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
                )
            )
        );
    }, [userAgent]);
}

export default useIsMobileDevice;
