import { useEffect, useState } from 'react';

type WindowSize = {
    width: number;
    height: number;
};

function useWindowSize() {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        function resizeCallback() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        resizeCallback();

        window.addEventListener('resize', resizeCallback);
        return () => {
            window.removeEventListener('resize', resizeCallback);
        };
    }, []);

    return windowSize;
}

export default useWindowSize;
