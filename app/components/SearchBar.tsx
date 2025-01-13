'use client';
import SearchIcon from './icons/SearchIcon';
import { useEffect, useRef, useState } from 'react';

const SearchBar = ({
    setOpenSearchBar,
}: {
    setOpenSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]); // keep results here
    const searchRef = useRef<HTMLDivElement | null>(null);

    // Handle clicks outside the search input or results
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setOpenSearchBar(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [setOpenSearchBar]);

    const handleSearch = (query: string) => {
        // logic here
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch(query);
        }
    };
    return (
        <div
            className="flex justify-center items-center rounded-full relative border-red border-2 p-2 w-full"
            ref={searchRef}>
            <SearchIcon
                strokeColor="stroke-blue"
                width="w-7"
                className="absolute right-0"
            />
            <input
                className="w-full bg-none focus:outline-none text-black ml-2"
                placeholder="Enter your search query here."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
            />
        </div>
    );
};

export default SearchBar;
