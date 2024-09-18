import { useEffect, useState } from 'react';

const userAgentRegExpForSafari = /^((?!chrome|android).)*safari/i;

function useIsSafari() {
    const [isSafari, setIsSafari] = useState(false);

    useEffect(() => {
        const isSafari = userAgentRegExpForSafari.test(navigator.userAgent);
        setIsSafari(isSafari);
    }, []);

    return isSafari;
}

export default useIsSafari;
