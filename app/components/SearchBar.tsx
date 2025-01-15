'use client';
import { getAllItems } from '@/lib/backend/items';
import SearchIcon from './icons/SearchIcon';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/lib/hooks';
import { Item } from '@/lib/types/Item';

const SearchBar = ({
    setOpenSearchBar,
}: {
    setOpenSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Item[]>([]); // keep results here
    const [items, setItems] = useState<Item[]>();
    const searchRef = useRef<HTMLDivElement | null>(null);
    const session = useAppSelector((state) => state.session);

    useEffect(() => {
        getAllItems(session.jwt).then((data) => {
            setItems(data.items);
        });
    });

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
            const filteredResults = items!.filter(
                (item) => item.name.toLowerCase().includes(query.toLowerCase()) // Case insensitive search
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
                            href={`/products/${result.id}`}
                            key={index}
                            className="py-2 px-4 hover:bg-grey flex gap-x-2 items-center">
                            <SearchIcon strokeColor="stroke-blue" width="w-7" />
                            <p className="font-bold text-black">
                                {result.name}
                            </p>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
