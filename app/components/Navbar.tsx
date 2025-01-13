import ProfileIcon from './icons/ProfileIcon';
import SearchIcon from './icons/SearchIcon';

const Navbar = () => {
    return (
        <div className="w-full flex justify-between items-center bg-white shadow-custom py-2.5 px-10 fixed">
            <img src="/mwh-logo.png" className="w-52" />
            <div className="text-blue font-bold font-inter flex gap-x-24">
                <a href="/home">Home</a>
                <a href="/quests">Quests</a>
                <a href="/request">Request an Item</a>
            </div>
            <div className="flex gap-x-12">
                <SearchIcon strokeColor="stroke-blue" width="w-7" />
                <ProfileIcon strokeColor="stroke-blue" width="w-8" />
            </div>
        </div>
    );
};

export default Navbar;
