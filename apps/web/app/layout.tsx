import { type PropsWithChildren } from 'react';
import Script from 'next/script';
import type { Metadata } from 'next';
import App from '@/components/base/App';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

export const metadata: Metadata = {
    title: 'MarkSlides Editor',
    description: 'Created by MarkSlides',
};

function RootLayout(props: PropsWithChildren): JSX.Element {
    const { children } = props;

    return (
        <html lang='en'>
            <body>
                <App>{children}</App>
                <Toaster />

                <Script
                    strategy='lazyOnload'
                    src='https://cdn.jsdelivr.net/npm/@marp-team/marpit-svg-polyfill/lib/polyfill.browser.js'
                />
            </body>
        </html>
    );
}

export default RootLayout;
