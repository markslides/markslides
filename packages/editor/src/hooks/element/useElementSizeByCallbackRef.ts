import { useCallback, useState } from 'react';

type ElementSize = {
    width: number;
    height: number;
};

function useElementSizeByCallbackRef<T extends Element>() {
    const [elementSize, setElementSize] = useState<ElementSize>({
        width: 0,
        height: 0,
    });

    const callbackRef = useCallback((targetElem: T) => {
        function resizeCallback() {
            if (!targetElem) {
                return;
            }

            setElementSize({
                width: targetElem.clientWidth,
                height: targetElem.clientHeight,
            });
        }
        resizeCallback();

        window.addEventListener('resize', resizeCallback);
        return () => {
            window.removeEventListener('resize', resizeCallback);
        };
    }, []);

    return { elementSize, callbackRef };
}

export default useElementSizeByCallbackRef;
