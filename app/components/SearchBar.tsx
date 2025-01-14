'use client';
import SearchIcon from './icons/SearchIcon';
import { useEffect, useRef, useState } from 'react';

const SearchBar = ({
    setOpenSearchBar,
}: {
    setOpenSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<string[]>([]); // keep results here
    const searchRef = useRef<HTMLDivElement | null>(null);
    const dummyQuery = [
        'NIKE shoes 1',
        'NIKE shoes 2',
        'NIKE shoes 3',
        'NIKE shoes 4',
    ];

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
        if (query.trim() === '') {
            setResults([]); // Clear results if query is empty
        } else {
            const filteredResults = dummyQuery.filter(
                (item) => item.toLowerCase().includes(query.toLowerCase()) // Case insensitive search
            );
            setResults(filteredResults);
        }
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
                onChange={(e) => {
                    const newQuery = e.target.value;
                    setQuery(newQuery); // Update query as user types
                    handleSearch(newQuery); // Filter results on every keystroke
                }}
                onKeyDown={handleKeyPress}
            />
            {results.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-custom mt-2 py-2 rounded-xl">
                    {results.map((result, index) => (
                        <a
                            href=""
                            key={index}
                            className="py-2 px-4 hover:bg-input flex gap-x-2 items-center">
                            <SearchIcon strokeColor="stroke-blue" width="w-7" />
                            <p className="font-bold text-black">{result}</p>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
