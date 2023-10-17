'use client';
import { Inter } from 'next/font/google';
import { useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './globals.css';

import Navbar from '@core/components/navbar';

const inter = Inter({ subsets: ['latin'] });

// comentado pois coloquei o use client
// export const metadata: Metadata = {
//     title: 'Gitlab Utils',
//     description: 'Utilitário para Gitlab',
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }, []);

    return (
        <html lang="pt-br" className="root">
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
                    integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
            </head>
            <body className={inter.className}>
                <Navbar></Navbar>
                <div className="container">
                    <main className="container py-5">{children}</main>
                </div>
            </body>
        </html>
    );
}
