'use client';

import {
    useEffect,
    useCallback,
    Suspense,
    type PropsWithChildren,
} from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { store, persistor } from '@/redux/store';
import { closeAllDialog } from '@/redux/slices/dialogSlice';
import PathChangeDetector from '@/components/base/PathChangeDetector';
import Dialogs from '@/components/dialogs';
import scTheme from '@/theme/styled-components';

const GlobalStyle = createGlobalStyle`
`;

function App(props: PropsWithChildren) {
    useEffect(() => {
        // PWA Service Worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then((registration) => {
                    // console.log('scope is: ', registration.scope);
                    // registration.pushManager.subscribe({
                    //     userVisibleOnly: true,
                    //     // applicationServerKey,
                    // });
                })
                .catch((error) => {});
        }

        const updateRealVerticalHeight = () => {
            document.documentElement.style.setProperty(
                '--vh',
                `${window.innerHeight}px`
            );
        };

        updateRealVerticalHeight();
        window.addEventListener('resize', updateRealVerticalHeight);
        return () => {
            window.removeEventListener('resize', updateRealVerticalHeight);
        };
    }, []);

    const handlePathChange = useCallback(() => {
        store.dispatch(closeAllDialog());
    }, [store]);

    return (
        <>
            <GlobalStyle />

            <ThemeProvider theme={scTheme}>
                <Provider store={store}>
                    <PersistGate
                        loading={null}
                        persistor={persistor}>
                        {props.children}
                    </PersistGate>

                    <Dialogs />

                    <Suspense fallback={null}>
                        <PathChangeDetector onPathChange={handlePathChange} />
                    </Suspense>
                </Provider>
            </ThemeProvider>
        </>
    );
}

export default App;
