'use client';
import { useAppSelector } from '@/lib/hooks';
import PageWithNavbar from '../components/PageWithNavbar';
import SearchIcon from '../components/icons/SearchIcon';
import { useEffect, useState } from 'react';
import { getAllItems } from '@/lib/backend/items';
import { Item } from '@/lib/types/Item';

const Inventory = () => {
    const user = useAppSelector((state) => state.user);
    const session = useAppSelector((state) => state.session);

    const [items, setAllItems] = useState<Item[]>([]);

    useEffect(() => {
        getAllItems(session.jwt).then((data) => {
            setAllItems(data.items);
        });
    }, []);

    if (user.user.cat !== 'ADMIN') {
        return (
            <PageWithNavbar>
                <div className="min-h-screen bg-off-white flex items-center justify-center">
                    <p className="text-black font-semibold font-inter">
                        You do not have access to this page.
                    </p>
                </div>
            </PageWithNavbar>
        );
    }

    return (
        <PageWithNavbar mode="ADMIN">
            <div className="p-8 bg-off-white flex flex-col gap-y-12">
                <p className="font-inter text-blue font-bold tracking-tight text-5xl">
                    Inventory
                </p>
                <div className="flex-col flex gap-y-4">
                    <p className="font-inter text-blue font-bold tracking-tight text-3xl">
                        All Available Items
                    </p>
                    <div className="bg-white rounded-xl justify-center shadow-custom p-8">
                        <div className="font-inter flex flex-col w-full rounded-2xl gap-y-4">
                            <div className="bg-grey w-full p-4 rounded-xl">
                                <div className="bg-white flex justify-center items-center rounded-lg relative p-2 w-full">
                                    <SearchIcon
                                        strokeColor="stroke-dark-grey"
                                        width="w-4"
                                        className="absolute right-0"
                                    />
                                    <input
                                        className="text-sm w-full bg-none focus:outline-none text-black ml-2"
                                        placeholder="Enter your search query here."
                                    />
                                </div>
                            </div>
                            <div className="border-[1px] border-grey rounded-xl">
                                <div className="w-full bg-input rounded-t-xl shadow-sm flex items-center text-black">
                                    <div className="w-full grid grid-cols-[1fr_2fr_3fr_2fr_2fr] w-full font-semibold  flex text-center items-center">
                                        <button className="p-4">Item ID</button>
                                        <button className="p-4">Name</button>
                                        <button className="p-4">
                                            Description
                                        </button>
                                        <button className="p-4">
                                            Price (in Credits)
                                        </button>
                                        <button className="p-4">Stock</button>
                                    </div>
                                </div>
                                {items.map((item, index) => {
                                    return (
                                        <div
                                            className="grid grid-cols-[1fr_2fr_3fr_2fr_2fr] font-medium font-inter place-items-center text-black text-center gap-y-1"
                                            key={item.id}>
                                            <p className="p-4">{item.id}</p>

                                            <p className="p-4">{item.name}</p>

                                            <p className="p-4">
                                                {`${item.description.slice(
                                                    0,
                                                    25
                                                )}${
                                                    item.description.length > 25
                                                        ? '...'
                                                        : ''
                                                }`}
                                            </p>

                                            <p className="p-4">{item.price}</p>

                                            <p className="p-4">{item.stock}</p>
                                            {index ===
                                            items.length - 1 ? null : (
                                                <div className="col-span-5 w-full">
                                                    <hr className="w-full border-grey" />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-y-4">
                    <p className="font-inter text-blue font-bold tracking-tight text-3xl">
                        Orders
                    </p>

                    <div className="flex flex-row items-start">
                        <div className="lg:shadow-custom font-inter flex flex-col w-full p-10 rounded-2xl">
                            <div className="flex flex-row mb-8">
                                <button className="font-semibold text-grey w-1/4 text-left text-green underline">
                                    {' '}
                                    All Orders{' '}
                                </button>
                                <button className="font-semibold text-grey w-1/4 text-left">
                                    {' '}
                                    Approved{' '}
                                </button>
                                <button className="font-semibold text-grey w-1/4 text-left">
                                    {' '}
                                    Pending Approval{' '}
                                </button>
                                <button className="font-semibold text-grey w-1/4 text-left">
                                    {' '}
                                    Claimed
                                </button>
                            </div>

                            <div className="w-full bg-gray-100 rounded-md shadow-sm p-2 px-10 mb-10">
                                <div className="bg-white h-10 p-4 w-1/3 rounded-md shadow flex items-center ">
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="font-semibold font-inter border-none outline-none text-gray-700 rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="w-full bg-[#F4F4F4] rounded-md shadow-sm p-7 px-10 mb-3 flex items-center">
                                <div className="w-full grid grid-cols-[1fr_2fr_3fr_3fr_2fr] flex items-center">
                                    <button className="font-semibold text-left">
                                        Order ID
                                    </button>
                                    <button className="font-semibold text-left">
                                        Name
                                    </button>
                                    <button className="font-semibold text-left">
                                        Product
                                    </button>
                                    <button className="font-semibold text-left">
                                        Note
                                    </button>
                                    <button className="font-semibold text-left">
                                        Status
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-[1fr_2fr_3fr_3fr_2fr]  text-black text-center gap-y-1">
                                <p className="font-inter font-bold p-3 underline">
                                    #SF30
                                </p>

                                <p className="font-inter font-bold p-3">
                                    Nicholas Jimmy Alden
                                </p>

                                <p className="font-inter font-bold p-3">
                                    Microphone
                                </p>

                                <p className="font-inter font-bold p-3">
                                    Red Color please
                                </p>

                                <p className="p-2">
                                    <span className="font-inter bg-green font-bold bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                                        COMPLETED
                                    </span>
                                </p>

                                <div className="col-span-5">
                                    <hr className="w-full border-gray-300" />
                                </div>

                                <p className="font-inter font-bold p-3 underline">
                                    #SF30
                                </p>

                                <p className="font-inter font-bold p-3">
                                    Nicholas Jimmy Alden
                                </p>

                                <p className="font-inter font-bold p-3">
                                    Microphone
                                </p>

                                <p className="font-inter font-bold p-3">
                                    Red Color please
                                </p>

                                <p className="p-3">
                                    <span className="font-inter bg-yellow font-bold bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                                        PREORDERED
                                    </span>
                                </p>

                                <div className="col-span-5">
                                    <hr className="w-full border-gray-300" />
                                </div>

                                <p className="font-inter font-bold p-3 underline">
                                    #SF30
                                </p>

                                <p className="font-inter font-bold p-3">
                                    Nicholas Jimmy Alden
                                </p>

                                <p className="font-inter font-bold p-3">
                                    Microphone
                                </p>

                                <p className="font-inter font-bold p-3">
                                    Red Color please
                                </p>

                                <p className="p-3">
                                    <span className="font-inter font-bold bg-[#D2422A] text-white px-2 py-1 rounded-md text-sm">
                                        AWAITING CONFIRMATION
                                    </span>
                                </p>

                                <div className="col-span-5">
                                    <hr className="w-full border-gray-300" />
                                </div>
                            </div>
                            <div className="flex justify-center items-center p-10">
                                <button className="font-inter font-bold  text-blue underline hover:text-blue-600">
                                    View More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="font-inter text-blue font-bold tracking-tight text-3xl px-40">
                    Requested Items
                </p>
                <div className="flex flex-row items-start px-20 bg-white mb-10">
                    <div className="lg:shadow-custom font-inter flex flex-col w-full m-4 lg:m-10 p-10 rounded-2xl">
                        <div className="flex flex-row mb-8">
                            <button className="font-semibold text-grey w-1/4 text-left text-green underline">
                                {' '}
                                All Requested Item{' '}
                            </button>
                            <button className="font-semibold text-grey w-1/3 text-left">
                                {' '}
                                Approved{' '}
                            </button>
                            <button className="font-semibold text-grey w-1/4 text-left">
                                {' '}
                                Pending Approval{' '}
                            </button>
                            <button className="font-semibold text-grey w-1/11 text-left">
                                {' '}
                                Rejected{' '}
                            </button>
                        </div>

                        <div className="w-full bg-gray-100 rounded-md shadow-sm p-2 px-10 mb-10">
                            <div className="bg-white h-10 p-4 w-1/3 rounded-md shadow flex items-center ">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="font-semibold font-inter border-none outline-none text-gray-700 rounded-md"
                                />
                            </div>
                        </div>
                        <div className="w-full bg-[#F4F4F4] rounded-md shadow-sm p-7 px-10 mb-3 flex items-center">
                            <div className="w-full flex items-center">
                                <button className="font-semibold w-1/6 text-left">
                                    Date
                                </button>
                                <button className="font-semibold w-1/6 text-left">
                                    Name
                                </button>
                                <button className="font-semibold w-1/4 text-left">
                                    Product
                                </button>
                                <button className="font-semibold w-1/3 text-left">
                                    Note
                                </button>
                                <button className="font-semibold w-1/9 text-left">
                                    Status
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-[1fr_3fr_3fr_2fr_2fr] text-black text-center gap-y-1">
                            <p className="font-inter font-bold p-3 ">
                                20/01/25
                            </p>

                            <p className="font-inter font-bold p-3">
                                Nicholas Jimmy Alden
                            </p>

                            <p className="font-inter font-bold p-3">
                                Microphone
                            </p>

                            <p className="font-inter font-bold p-3">
                                Red Color please
                            </p>

                            <p className="p-2">
                                <span className="font-inter bg-green font-bold bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                                    APPROVED
                                </span>
                            </p>

                            <div className="col-span-5">
                                <hr className="w-full border-gray-300" />
                            </div>

                            <p className="font-inter font-bold p-3">20/01/25</p>

                            <p className="font-inter font-bold p-3">
                                Nicholas Jimmy Alden
                            </p>

                            <p className="font-inter font-bold p-3">
                                Microphone
                            </p>

                            <p className="font-inter font-bold p-3">
                                Red Color please
                            </p>

                            <p className="p-3">
                                <span className="font-inter bg-yellow font-bold bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                                    PENDING APPROVAL
                                </span>
                            </p>

                            <div className="col-span-5">
                                <hr className="w-full border-gray-300" />
                            </div>

                            <p className="font-inter font-bold p-3">20/01/25</p>

                            <p className="font-inter font-bold p-3">
                                Nicholas Jimmy Alden
                            </p>

                            <p className="font-inter font-bold p-3">
                                Microphone
                            </p>

                            <p className="font-inter font-bold p-3">
                                Red Color please
                            </p>

                            <p className="p-3">
                                <span className="font-inter font-bold bg-[#D2422A] text-white px-2 py-1 rounded-md text-sm">
                                    REJECTED
                                </span>
                            </p>

                            <div className="col-span-5">
                                <hr className="w-full border-gray-300" />
                            </div>
                        </div>
                        <div className="flex justify-center items-center p-10">
                            <button className="font-inter font-bold  text-blue underline hover:text-blue-600">
                                View More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </PageWithNavbar>
    );
};

export default Inventory;
