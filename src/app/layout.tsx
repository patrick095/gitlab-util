'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { useEffect } from 'react';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './core/components/navbar';

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
            <body className={inter.className}>
                <Navbar></Navbar>
                <div className="container">
                    <main className="container py-5">{children}</main>
                </div>
            </body>
        </html>
    );
}
