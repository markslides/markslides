import { type PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import App from '@/components/base/App';
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
            </body>
        </html>
    );
}

export default RootLayout;
