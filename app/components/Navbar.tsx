import { useState } from 'react';
import ProfileIcon from './icons/ProfileIcon';
import SearchIcon from './icons/SearchIcon';
import SearchBar from './SearchBar';
import Link from 'next/link';

const Navbar = () => {
    const [openSearchBar, setOpenSearchBar] = useState<boolean>(false);
    const toggleSearchBar = () => {
        setOpenSearchBar((openSearchBar) => !openSearchBar);
    };
    return (
        <div
            className={`w-full  ${
                openSearchBar
                    ? 'grid grid-cols-[1fr_2fr_1fr] gap-x-8'
                    : 'flex justify-between'
            } items-center bg-white shadow-custom py-2.5 px-10 fixed`}>
            <img src="/mwh-logo.png" className="w-52" />
            {!openSearchBar ? (
                <>
                    <div className="text-blue font-bold font-inter flex gap-x-24 relative">
                        <Link href="/home">Home</Link>
                        <Link href="/quests">Quests</Link>
                        <Link href="/request">Request an Item</Link>
                    </div>
                    <div className="flex gap-x-12">
                        <button onClick={toggleSearchBar}>
                            <SearchIcon strokeColor="stroke-blue" width="w-7" />
                        </button>
                        <a href="/profile">
                            <ProfileIcon
                                strokeColor="stroke-blue"
                                width="w-8"
                            />
                        </a>
                    </div>
                </>
            ) : (
                <div className="w-full font-inter flex gap-x-2">
                    <SearchBar setOpenSearchBar={setOpenSearchBar} />
                    <button
                        onClick={toggleSearchBar}
                        className="bg-red rounded-full px-8 py-2 font-semibold text-white">
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default Navbar;
