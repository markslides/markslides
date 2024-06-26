import { useState, useEffect } from 'react';

const hasFocus = () => typeof document !== 'undefined' && document.hasFocus();

function useIsWindowFocused() {
    const [isFocused, setIsFocused] = useState(hasFocus);

    useEffect(() => {
        setIsFocused(hasFocus());

        function handleFocus() {
            setIsFocused(true);
        }
        function handleBlur() {
            setIsFocused(false);
        }

        window.addEventListener('focus', handleFocus);
        window.addEventListener('blur', handleBlur);
        return () => {
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('blur', handleBlur);
        };
    }, []);

    return isFocused;
}

export default useIsWindowFocused;
