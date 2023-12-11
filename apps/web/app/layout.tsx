import { type PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'MarkSlides Editor',
    description: 'Created by MarkSlides',
};

function RootLayout(props: PropsWithChildren): JSX.Element {
    const { children } = props;

    return (
        <html lang='en'>
            <body>{children}</body>
        </html>
    );
}

export default RootLayout;
