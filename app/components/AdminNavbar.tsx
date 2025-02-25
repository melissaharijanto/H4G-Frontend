import Link from 'next/link';
import ProfileIcon from './icons/ProfileIcon';

const AdminNavbar = () => {
    return (
        <div
            className={`w-full  
                    flex justify-between
             items-center bg-white shadow-custom py-2.5 px-10 fixed`}>
            <img src="/mwh-logo.png" className="w-52" />

            <div className="text-blue font-bold font-inter flex gap-x-24 relative">
                <Link href="/home">Home</Link>
                <Link href="/inventory">Inventory</Link>
                <Link href="/request">Students</Link>
                <Link href="/quests">Quests</Link>
            </div>
            <div className="flex gap-x-12">
                <a href="/profile">
                    <ProfileIcon strokeColor="stroke-blue" width="w-8" />
                </a>
            </div>
        </div>
    );
};

export default AdminNavbar;
