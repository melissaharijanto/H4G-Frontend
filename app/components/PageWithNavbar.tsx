import { ReactNode } from 'react';
import Navbar from './Navbar';
import AdminNavbar from './AdminNavbar';

const PageWithNavbar = ({
    children,
    mode = 'USER',
}: {
    children: ReactNode;
    mode?: string;
}) => {
    return (
        <div className="min-h-screen bg-off-white">
            {mode === 'USER' ? <Navbar /> : <AdminNavbar />}
            <div className="pt-18">{children}</div>
        </div>
    );
};

export default PageWithNavbar;
