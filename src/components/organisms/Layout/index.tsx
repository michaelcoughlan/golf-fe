import { ReactElement } from 'react';
import { Inter } from 'next/font/google'

import { Footer, Navbar } from '@/components';
import { Props } from './types';

const inter = Inter({ subsets: ['latin'] })

const Layout = ({ children }: Props): ReactElement => {
    return (
        <div className={inter.className}>
            <Navbar />
            <main className="min-h-[88vh] container mx-auto pt-4">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
