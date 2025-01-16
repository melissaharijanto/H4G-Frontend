'use client';
import { useAppSelector } from '@/lib/hooks';
import PageWithNavbar from '../components/PageWithNavbar';
import { useEffect } from 'react';
import { getAllUserTasks } from '@/lib/backend/tasks';

const Profile = () => {
    const user = useAppSelector((state) => state.user);
    const session = useAppSelector((state) => state.session);

    // useEffect(() => {
    //     getAllUserTasks(session.jwt, user.user.uid).then((data) => {
    //         console.log(data);
    //     });
    // }, []);

    return (
        <PageWithNavbar>
            <div className="flex flex-row w-full mt-8">
                <div className="w-full bg-cover bg-no-repeat bg-center flex flex-col justify-center items-start p-8">
                    <p className="font-inter font-bold tracking-tight text-2xl text-red mb-2">
                        My Profile
                    </p>
                    <p className="font-inter text-blue font-bold tracking-tight text-4xl lg:text-6xl">
                        {user?.user.name}
                    </p>
                    <p className="font-inter text-blue font-bold tracking-tight">
                        {user?.user.email}
                    </p>
                    <p className="font-inter font-bold tracking-tight text-black">
                        {user?.user.cat == 'USER' ? 'Student' : 'Admin'}
                    </p>
                    <p className="font-inter tracking-tight text-dark-grey font-inter italic text-sm ">
                        If you notice any discrepancies with your data, please
                        contact the admin.
                    </p>
                </div>

                <div className="flex gap-4 justify-center items-center px-10">
                    <div className="w-40 h-40 bg-gradient-to-b from-orange-400 to-orange-300 rounded-xl flex flex-col justify-center items-center shadow-lg">
                        <p className="font-inter text-4xl font-bold text-white">
                            15
                        </p>
                        <p className="font-inter text-md font-medium text-white mt-2">
                            Ongoing Tasks
                        </p>
                    </div>

                    <div className="w-40 h-40 bg-gradient-to-b from-orange-400 to-orange-300 rounded-xl flex flex-col justify-center items-center shadow-lg">
                        <p className="font-inter text-4xl font-bold text-white">
                            15
                        </p>
                        <p className="font-inter text-md text-white mt-2">
                            Pending Orders
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-row">
                <div className="lg:shadow-custom font-inter flex flex-col w-full m-4 lg:m-10 p-10 rounded-2xl">
                    <h2 className="font-bold text-4xl mb-10 text-black">
                        Your Ongoing Tasks
                    </h2>

                    <div className="grid grid-cols-[1fr_3fr_2fr_2fr] text-black text-center gap-y-2">
                        <div className="w-full col-span-4">
                            <hr className="w-full border-2 border-grey" />
                        </div>
                        <p className="text-center text-bold">No.</p>
                        <p className="text-center text-bold">Task Name</p>
                        <p className="text-center text-bold">Status</p>
                        <p className="text-center text-bold">Deadline</p>
                        <div className="w-full col-span-4">
                            <hr className="w-full border-2 border-grey" />
                        </div>
                        <p className="font-inter font-bold p-2 ">1</p>
                        <p className="font-inter font-bold p-2">
                            Water Plants in Garden
                        </p>
                        <p className="p-2">
                            <span className="font-inter font-bold bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                                ONGOING
                            </span>
                        </p>
                        <p className="font-inter font-bold p-2">20/01/25</p>
                        <div className="w-full col-span-4">
                            <hr className="w-full border-2 border-grey" />
                        </div>
                        <p className="font-inter font-bold p-2 ">2</p>
                        <p className="font-inter font-bold p-2">
                            Water Plants in Garden
                        </p>
                        <p className="p-2">
                            <span className="font-inter font-bold bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                                ONGOING
                            </span>
                        </p>

                        <p className="font-inter font-bold p-2">20/01/25</p>
                        <div className="w-full col-span-4">
                            <hr className="w-full border-2 border-grey" />
                        </div>
                        <p className="font-inter font-bold p-2 ">3</p>
                        <p className="font-inter font-bold p-2">
                            Water Plants in Garden
                        </p>
                        <p className="p-2">
                            <span className="font-inter font-bold bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                                ONGOING
                            </span>
                        </p>
                        <p className="font-inter font-bold p-2">20/01/25</p>
                        <div className="w-full col-span-4">
                            <hr className="w-full border-2 border-grey" />
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-gray-700 font-bold p-2"></div>
                    <div className="flex justify-between items-center text-gray-700 font-bold p-2"></div>
                    <div className="flex justify-center items-center p-10">
                        <button className="font-inter font-bold  text-blue underline hover:text-blue-600">
                            View More
                        </button>
                    </div>
                </div>

                <div className="lg:shadow-custom font-inter flex flex-col w-full m-4 lg:m-10 p-10 rounded-2xl">
                    <h2 className="font-bold text-4xl mb-10 text-black">
                        Your Pending Tasks
                    </h2>

                    <hr className="border-2 border-gray-150" />
                    <div className="flex justify-between items-center text-gray-700 font-bold p-2 ">
                        <p className="w-1/4 text-left">No.</p>
                        <p className="w-1/3 text-left">Task Name</p>
                        <p className="w-1/4 text-left">Status</p>
                        <p className="w-1/11 text-left">Deadline</p>
                    </div>
                    <hr className="border-2 border-gray-150" />
                    <div className="flex justify-between items-center text-gray-700 font-bold p-2">
                        <p className="font-inter font-bold p-2 ">1</p>
                        <p className="font-inter font-bold p-2">
                            Water Plants in Garden
                        </p>
                        <p className="p-2">
                            <span className="font-inter font-bold bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                                ONGOING
                            </span>
                        </p>
                        <p className="font-inter font-bold p-2">20/01/25</p>
                    </div>
                    <hr className="border-2 border-gray-150" />
                    <div className="flex justify-between items-center text-gray-700 font-bold p-2">
                        <p className="font-inter font-bold p-2 ">2</p>
                        <p className="font-inter font-bold p-2">
                            Water Plants in Garden
                        </p>
                        <p className="p-2">
                            <span className="font-inter font-bold bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                                ONGOING
                            </span>
                        </p>
                        <p className="font-inter font-bold p-2">20/01/25</p>
                    </div>
                    <hr className="border-2 border-gray-150" />
                    <div className="flex justify-between items-center text-gray-700 font-bold p-2">
                        <p className="font-inter font-bold p-2 ">3</p>
                        <p className="font-inter font-bold p-2">
                            Water Plants in Garden
                        </p>
                        <p className="p-2">
                            <span className="font-inter font-bold bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                                ONGOING
                            </span>
                        </p>
                        <p className="font-inter font-bold p-2">20/01/25</p>
                    </div>
                    <hr className="border-2 border-gray-150" />
                    <div className="flex justify-center items-center p-10">
                        <button className="font-inter font-bold  text-blue underline hover:text-blue-600">
                            View More
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-row h-screen bg-white">
                <div className="lg:shadow-custom font-inter flex flex-col w-full m-4 lg:m-10 p-10 rounded-2xl">
                    <p className="text-5xl font-black mb-10 text-black">
                        Your Order History
                    </p>
                    <div className="flex gap-4 justify-center items-center px-10">
                        <div className="w-40 h-40 bg-gradient-to-b from-red-400 to-red-300 rounded-xl flex flex-col justify-center items-center shadow-lg">
                            <p className="font-inter text-4xl font-bold text-white">
                                15
                            </p>
                            <p className="font-inter text-md font-medium text-white mt-2">
                                Rejected Orders
                            </p>
                        </div>
                        <div className="w-40 h-40 bg-gradient-to-b from-orange-400 to-orange-300 rounded-xl flex flex-col justify-center items-center shadow-lg">
                            <p className="font-inter text-4xl font-bold text-white">
                                15
                            </p>
                            <p className="font-inter text-md text-white mt-2">
                                Pending Orders
                            </p>
                        </div>
                        <div className="w-40 h-40 bg-gradient-to-b from-green-400 to-green-300 rounded-xl flex flex-col justify-center items-center shadow-lg">
                            <p className="font-inter text-4xl font-bold text-white">
                                15
                            </p>
                            <p className="font-inter text-md text-white mt-2">
                                Claimed Orders
                            </p>
                        </div>
                    </div>
                    <div className="py-10">
                        <hr className="border-2 border-gray-150" />
                        <div className="flex justify-between items-center text-gray-700 font-bold p-2 ">
                            <p className="w-1/9 text-left">No.</p>
                            <p className="w-1/5 text-left">Order ID</p>
                            <p className="w-1/6 text-left">Item Name</p>
                            <p className="w-1/7 text-left">Price</p>
                            <p className="w-1/10 text-left">Status</p>
                        </div>
                        <hr className="border-2 border-gray-150" />

                        <div className="flex justify-between items-center text-gray-700 font-bold p-2">
                            <p className="font-inter font-bold p-2 ">1</p>
                            <p className="font-inter font-bold p-2">
                                ABCDEFGHI12345
                            </p>
                            <p className="font-inter font-bold p-2">
                                NIKE Shoes Panjangin Dikit Biar Figma-nya
                                Bagussss
                            </p>
                            <p className="font-inter font-bold p-2">
                                30 Credits
                            </p>
                            <p className="p-2">
                                <span className="font-inter font-bold bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                                    AWAITING CONFIRMATION
                                </span>
                            </p>
                        </div>
                        <hr className="border-2 border-gray-150" />

                        <div className="flex justify-between items-center text-gray-700 font-bold p-2">
                            <p className="font-inter font-bold p-2 ">1</p>
                            <p className="font-inter font-bold p-2">
                                ABCDEFGHI12345
                            </p>
                            <p className="font-inter font-bold p-2">
                                NIKE Shoes Panjangin Dikit Biar Figma-nya
                                Bagussss
                            </p>
                            <p className="font-inter font-bold p-2">
                                30 Credits
                            </p>
                            <p className="p-2">
                                <span className="font-inter font-bold bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                                    AWAITING CONFIRMATION
                                </span>
                            </p>
                        </div>
                        <hr className="border-2 border-gray-150" />

                        <div className="flex justify-between items-center text-gray-700 font-bold p-2">
                            <p className="font-inter font-bold p-2 ">1</p>
                            <p className="font-inter font-bold p-2">
                                ABCDEFGHI12345
                            </p>
                            <p className="font-inter font-bold p-2">
                                NIKE Shoes Panjangin Dikit Biar Figma-nya
                                Bagussss
                            </p>
                            <p className="font-inter font-bold p-2">
                                30 Credits
                            </p>
                            <p className="p-2">
                                <span className="font-inter font-bold bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                                    AWAITING CONFIRMATION
                                </span>
                            </p>
                        </div>
                        <hr className="border-2 border-gray-150" />
                        <div className="flex justify-center items-center p-10">
                            <button className="font-inter font-bold  text-blue underline hover:text-blue-600">
                                View More
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row h-screen bg-white">
                <div className="lg:shadow-custom font-inter flex flex-col w-full m-4 lg:m-10 p-10 rounded-2xl">
                    <p className="text-5xl font-black mb-10 text-black">
                        Your Quest History
                    </p>
                    <div className="flex gap-4 justify-center items-center px-10">
                        <div className="w-40 h-40 bg-gradient-to-b from-red-400 to-red-300 rounded-xl flex flex-col justify-center items-center shadow-lg">
                            <p className="font-inter text-4xl font-bold text-white">
                                15
                            </p>
                            <p className="font-inter text-md font-medium text-white mt-2">
                                Rejected Quest
                            </p>
                        </div>
                        <div className="w-40 h-40 bg-gradient-to-b from-orange-400 to-orange-300 rounded-xl flex flex-col justify-center items-center shadow-lg">
                            <p className="font-inter text-4xl font-bold text-white">
                                15
                            </p>
                            <p className="font-inter text-md text-white mt-2">
                                Pending Quest
                            </p>
                        </div>
                        <div className="w-40 h-40 bg-gradient-to-b from-green-400 to-green-300 rounded-xl flex flex-col justify-center items-center shadow-lg">
                            <p className="font-inter text-4xl font-bold text-white">
                                15
                            </p>
                            <p className="font-inter text-md text-white mt-2">
                                Claimed Quest
                            </p>
                        </div>
                    </div>
                    <div className="py-10">
                        <hr className="border-2 border-gray-150" />
                        <div className="flex justify-between items-center text-gray-700 font-bold p-2 ">
                            <p className="w-1/4 text-left">No.</p>
                            <p className="w-1/3 text-left">Quest Name</p>
                            <p className="w-1/5 text-left">Status</p>
                            <p className="w-1/10 text-left">Deadline</p>
                        </div>
                        <hr className="border-2 border-gray-150" />

                        <div className="flex justify-between items-center text-gray-700 font-bold p-2">
                            <p className="font-inter font-bold p-2 ">1</p>
                            <p className="font-inter font-bold p-2">
                                Water Plants in Garden
                            </p>
                            <p className="p-2">
                                <span className="font-inter font-bold bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                                    ONGOING
                                </span>
                            </p>
                            <p className="font-inter font-bold p-2">20/01/25</p>
                        </div>
                        <hr className="border-2 border-gray-150" />

                        <div className="flex justify-between items-center text-gray-700 font-bold p-2">
                            <p className="font-inter font-bold p-2 ">1</p>
                            <p className="font-inter font-bold p-2">
                                Water Plants in Garden
                            </p>
                            <p className="p-2">
                                <span className="font-inter font-bold bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                                    ONGOING
                                </span>
                            </p>
                            <p className="font-inter font-bold p-2">20/01/25</p>
                        </div>
                        <hr className="border-2 border-gray-150" />

                        <div className="flex justify-between items-center text-gray-700 font-bold p-2">
                            <p className="font-inter font-bold p-2 ">1</p>
                            <p className="font-inter font-bold p-2">
                                Water Plants in Garden
                            </p>
                            <p className="p-2">
                                <span className="font-inter font-bold bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                                    ONGOING
                                </span>
                            </p>
                            <p className="font-inter font-bold p-2">20/01/25</p>
                        </div>
                        <hr className="border-2 border-gray-150" />

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

export default Profile;
