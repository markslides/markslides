import { useEffect, useState } from 'react';

type OS = 'Android' | 'iOS' | 'MacOS' | 'Windows';

type BrowserType =
    | 'Whale'
    | 'SamsungBrowser'
    | 'Safari'
    | 'Chrome'
    | 'Firefox'
    | 'Edge'
    | 'Naver'
    | 'Kakao';

type DeviceType = 'Desktop' | 'Mobile';

type AppType = 'Web' | 'App';

function useUserAgent() {
    const [os, setOS] = useState<OS | null>(null);
    const [browserType, setBrowserType] = useState<BrowserType | null>(null);
    const [deviceType, setDeviceType] = useState<DeviceType | null>(null);

    useEffect(() => {
        const userAgent = navigator.userAgent.toUpperCase();

        // === Desktop ===
        // Chrome: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        // Safari: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15'
        // Whale: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Whale/3.21.192.22 Safari/537.36'
        // === Mobile ===
        // Chrome: 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
        // Safari:
        // Whale:

        // OS
        if (/ANDROID/.test(userAgent)) {
            setOS('Android');
        } else if (/IPAD|IPHONE|IPOD/.test(userAgent)) {
            setOS('iOS');
        } else if (/MACINTOSH/.test(userAgent)) {
            setOS('MacOS');
        } else if (/WINDOWS/.test(userAgent)) {
            setOS('Windows');
        }

        // Browser
        if (userAgent.includes('NAVER')) {
            setBrowserType('Naver');
        } else if (userAgent.includes('WHALE/')) {
            setBrowserType('Whale');
        } else if (userAgent.includes('KAKAOTALK')) {
            setBrowserType('Kakao');
        } else if (userAgent.includes('SAMSUNGBROWSER/')) {
            setBrowserType('SamsungBrowser');
        } else if (userAgent.includes('FIREFOX/')) {
            setBrowserType('Firefox');
        } else if (userAgent.includes('EDG')) {
            setBrowserType('Edge');
        } else if (userAgent.includes('SAFARI/')) {
            if (userAgent.includes('CHROME/') || userAgent.includes('CRIOS/')) {
                setBrowserType('Chrome');
            } else {
                setBrowserType('Safari');
            }
        }

        // Device
        if (userAgent.includes('MOBI')) {
            setDeviceType('Mobile');
        } else {
            setDeviceType('Desktop');
        }
    }, []);

    return { os, browserType, deviceType };
}

export default useUserAgent;
