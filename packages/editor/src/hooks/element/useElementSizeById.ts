import { useEffect, useState } from 'react';

type ElementSize = {
    width: number;
    height: number;
};

function useElementSizeById(id: string) {
    const [elementSize, setElementSize] = useState<ElementSize>({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        function resizeCallback() {
            const targetElem = document.getElementById(id);
            if (!targetElem) {
                return;
            }

            setElementSize({
                width: targetElem?.clientWidth,
                height: targetElem?.clientHeight,
            });
        }
        resizeCallback();

        window.addEventListener('resize', resizeCallback);
        return () => {
            window.removeEventListener('resize', resizeCallback);
        };
    }, [id]);

    return elementSize;
}

export default useElementSizeById;
