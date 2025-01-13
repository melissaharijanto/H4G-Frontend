import { ReactNode } from 'react';
import Navbar from './Navbar';

const PageWithNavbar = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen bg-off-white">
            <Navbar />
            <div className="pt-18">{children}</div>
        </div>
    );
};

export default PageWithNavbar;
