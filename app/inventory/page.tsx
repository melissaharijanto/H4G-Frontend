'use client';
import { useAppSelector } from '@/lib/hooks';
import PageWithNavbar from '../components/PageWithNavbar';
import SearchIcon from '../components/icons/SearchIcon';
import { useEffect, useState } from 'react';
import { getAllItems } from '@/lib/backend/items';
import { Item } from '@/lib/types/Item';
import AvailableItemsTable from '../components/inventory/AvailableItemsTable';
import OrdersTable from '../components/inventory/OrdersTable';
import { Transaction } from '@/lib/types/Transaction';
import { getAllTransactions } from '@/lib/backend/transactions';

const Inventory = () => {
    const user = useAppSelector((state) => state.user);
    const session = useAppSelector((state) => state.session);

    const [items, setAllItems] = useState<Item[]>([]);
    const [orders, setAllOrders] = useState<Transaction[]>([]);

    useEffect(() => {
        getAllItems(session.jwt).then((data) => {
            setAllItems(data.items);
        });

        getAllTransactions(session.jwt).then((data) => {
            console.log(data.transactions);
            setAllOrders(data.transactions);
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
                <AvailableItemsTable items={items} />
                <OrdersTable orders={orders} />

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
