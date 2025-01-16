'use client';
import { useAppSelector, useAppStore } from '@/lib/hooks';
import PageWithNavbar from '../components/PageWithNavbar';
import { useEffect, useState } from 'react';
import { getAllTasks, getAllUserTasks } from '@/lib/backend/tasks';
import { UserTask } from '@/lib/types/UserTask';
import { clearUser } from '@/lib/features/userSlice';
import { redirect } from 'next/navigation';
import { clearJwt } from '@/lib/features/sessionSlice';
import { Task } from '@/lib/types/Task';
import ProtectedRoute from '../components/ProtectedRoute';

const Profile = () => {
    const user = useAppSelector((state) => state.user);
    const session = useAppSelector((state) => state.session);
    const store = useAppStore();
    const [userTasks, setUserTasks] = useState<UserTask[]>([]);
    const [allTasks, setAllTasks] = useState<Task[]>([]);

    const convertGMTToSGT = (gmtDateString: string) => {
        // Parse the GMT date string into a Date object in UTC (GMT)
        const gmtDate = new Date(gmtDateString);

        // Define options for formatting the date
        const options = {
            weekday: 'short', // Should be 'short' or 'long'
            year: 'numeric', // 'numeric' or '2-digit'
            month: 'short', // 'short' (Jan, Feb, etc.) or 'long' (January, February, etc.)
            day: 'numeric', // 'numeric' for the day of the month (e.g., '2')
            hour: '2-digit', // '2-digit' for two-digit hours (e.g., '07')
            minute: '2-digit', // '2-digit' for two-digit minutes (e.g., '59')
            hour12: false, // Use 24-hour format
            timeZone: 'Asia/Singapore', // Ensure the timezone is Asia/Singapore
        };

        // Format the date to SGT using the correct timezone (Asia/Singapore)
        const sgtFormatted = new Intl.DateTimeFormat('en-SG', options).format(
            gmtDate
        );

        return sgtFormatted;
    };

    useEffect(() => {
        getAllUserTasks(session.jwt, user.user.uid).then((data) => {
            console.log(data);
            setUserTasks(data.usertasks);
        });

        getAllTasks(session.jwt).then((data) => {
            console.log(data);
            setAllTasks(data.tasks);
        });

        console.log(user.transactions);
    }, []);

    const logOut = () => {
        store.dispatch(clearUser());
        store.dispatch(clearJwt());
        redirect('/');
    };

    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <div className="p-8 flex flex-col gap-y-8">
                    <div className="flex flex-row w-full">
                        <div className="w-full bg-cover bg-no-repeat bg-center flex flex-col justify-center gap-y-2 items-start">
                            <div>
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
                                    {user?.user.cat == 'USER'
                                        ? 'Student'
                                        : 'Admin'}
                                </p>
                                <p className="font-inter tracking-tight text-dark-grey font-inter italic text-sm ">
                                    If you notice any discrepancies with your
                                    data, please contact the admin.
                                </p>
                            </div>
                            <div>
                                <button
                                    className="bg-green text-white px-4 py-2 font-semibold rounded-xl"
                                    onClick={logOut}>
                                    LOG OUT
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-4 justify-center items-center px-10">
                            <div className="w-40 h-40 bg-gradient-to-b from-yellow to-light-yellow rounded-xl flex flex-col justify-center items-center shadow-lg">
                                <p className="font-inter text-4xl font-bold text-white">
                                    {
                                        userTasks.filter(
                                            (task) => task.uid === user.user.uid
                                        ).length
                                    }
                                </p>
                                <p className="font-inter text-md font-semibold text-white mt-2">
                                    Ongoing Tasks
                                </p>
                            </div>

                            <div className="w-40 h-40 bg-gradient-to-b from-yellow to-light-yellow rounded-xl flex flex-col justify-center items-center shadow-lg">
                                <p className="font-inter text-4xl font-bold text-white">
                                    {
                                        user.transactions.filter(
                                            (trx) =>
                                                trx.status !== 'CLAIMED' &&
                                                trx.status !== 'CANCELED'
                                        ).length
                                    }
                                </p>
                                <p className="font-inter text-md font-semibold text-white mt-2">
                                    Pending Orders
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row justify-between gap-x-8">
                        <div className="lg:shadow-custom font-inter flex flex-col w-full p-8 rounded-2xl">
                            <h2 className="font-bold text-4xl mb-10 text-black">
                                Your Ongoing Quests
                            </h2>

                            <div className="grid grid-cols-[1fr_3fr_2fr_3fr] text-black p-2 text-center gap-y-2 font-bold place-items-center">
                                <div className="w-full col-span-4">
                                    <hr className="w-full border-[1px] border-grey" />
                                </div>
                                <p className="text-center">No.</p>
                                <p className="text-center">Quest ID</p>
                                <p className="text-center">Status</p>
                                <p className="text-center">End Date</p>
                                <div className="w-full col-span-4">
                                    <hr className="w-full border-[1px] border-grey" />
                                </div>
                            </div>
                            {userTasks.slice(0, 5).map((task, index) => {
                                const taskData = allTasks.filter(
                                    (filteredTask) =>
                                        filteredTask.id === task.task &&
                                        task.status === 'ONGOING'
                                );
                                return (
                                    <div
                                        className="grid grid-cols-[1fr_3fr_2fr_3fr] text-black text-center gap-y-2 p-2 font-medium place-items-center"
                                        key={task.id}>
                                        <p className="font-inter">
                                            {index + 1}.
                                        </p>
                                        <p className="font-inter">
                                            {taskData[0]?.name}
                                        </p>
                                        <p className="font-inter">
                                            <span className="font-inter !font-bold bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                                                {task.status}
                                            </span>
                                        </p>
                                        <p className="font-inter">
                                            {convertGMTToSGT(
                                                taskData[0]?.end_time
                                            )}
                                        </p>
                                        <div className="w-full col-span-4">
                                            <hr className="w-full border-[1px] border-grey" />
                                        </div>
                                    </div>
                                );
                            })}
                            {/* {userTasks.length > 5 ? (
                            <div className="flex justify-center items-center p-2">
                                <button className="font-inter font-bold  text-blue underline hover:text-blue-600">
                                    View More
                                </button>
                            </div>
                        ) : null} */}
                        </div>
                        <div className="lg:shadow-custom font-inter flex flex-col w-full p-8 rounded-2xl">
                            <h2 className="font-bold text-4xl mb-10 text-black">
                                Your Pending Orders
                            </h2>

                            <div className="grid grid-cols-[1fr_2fr_2fr_2fr_2fr] text-black text-center gap-y-2  p-2  font-bold place-items-center">
                                <div className="w-full col-span-5">
                                    <hr className="w-full border-[1px] border-grey" />
                                </div>
                                <p className="text-center">No.</p>
                                <p className="text-center">Transaction ID</p>
                                <p className="text-center">Item ID</p>
                                <p className="text-center">Quantity</p>
                                <p className="text-center">Status</p>
                                <div className="w-full col-span-5">
                                    <hr className="w-full border-[1px] border-grey" />
                                </div>
                            </div>
                            {user.transactions
                                .filter(
                                    (trx) =>
                                        trx.status !== 'CLAIMED' &&
                                        trx.status !== 'CANCELED'
                                )
                                .map((trx, index) => {
                                    return (
                                        <div
                                            className="grid grid-cols-[1fr_2fr_2fr_2fr_2fr] text-black text-center gap-y-2 p-2 font-medium place-items-center"
                                            key={trx.id}>
                                            <p className="font-inter">
                                                {index + 1}.
                                            </p>
                                            <p className="font-inter">
                                                {trx.id}
                                            </p>
                                            <a
                                                href={`/products/${trx.item}`}
                                                className="font-inter text-blue underline">
                                                {trx.item}
                                            </a>
                                            <p className="font-inter">
                                                {trx.quantity}
                                            </p>
                                            <p className="font-inter">
                                                <span className="font-inter !font-bold bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                                                    {trx.status}
                                                </span>
                                            </p>
                                            <div className="w-full col-span-5">
                                                <hr className="w-full border-[1px] border-grey" />
                                            </div>
                                        </div>
                                    );
                                })}

                            {}
                            {/* {user.transactions.filter(
                            (trx) =>
                                trx.status !== 'CLAIMED' &&
                                trx.status !== 'CANCELED'
                        ).length > 5 ? (
                            <div className="flex justify-center items-center p-2">
                                <button className="font-inter font-bold  text-blue underline hover:text-blue-600">
                                    View More
                                </button>
                            </div>
                        ) : null} */}
                        </div>
                    </div>

                    <div className="flex flex-row bg-white">
                        <div className="lg:shadow-custom font-inter flex flex-col w-full p-10 rounded-2xl">
                            <p className="text-5xl font-black mb-10 text-black">
                                Your Transaction History
                            </p>
                            <div className="flex gap-4 justify-center items-center px-10">
                                <div className="w-40 h-40 bg-gradient-to-b from-red to-light-red rounded-xl flex flex-col justify-center items-center shadow-lg">
                                    <p className="font-inter text-4xl font-bold text-white">
                                        {
                                            user.transactions.filter(
                                                (trx) =>
                                                    trx.status === 'CANCELED'
                                            ).length
                                        }
                                    </p>
                                    <p className="font-inter text-md font-semibold text-white mt-2">
                                        Rejected Orders
                                    </p>
                                </div>
                                <div className="w-40 h-40 bg-gradient-to-b from-yellow to-light-yellow rounded-xl flex flex-col justify-center items-center shadow-lg">
                                    <p className="font-inter text-4xl font-bold text-white">
                                        {
                                            user.transactions.filter(
                                                (trx) =>
                                                    trx.status !== 'CLAIMED' &&
                                                    trx.status !== 'CANCELED'
                                            ).length
                                        }
                                    </p>
                                    <p className="font-inter text-md font-semibold text-white mt-2">
                                        Pending Orders
                                    </p>
                                </div>
                                <div className="w-40 h-40 bg-gradient-to-b from-green to-light-green rounded-xl flex flex-col justify-center items-center shadow-lg">
                                    <p className="font-inter text-4xl font-bold text-white">
                                        {
                                            user.transactions.filter(
                                                (trx) =>
                                                    trx.status === 'CLAIMED'
                                            ).length
                                        }
                                    </p>
                                    <p className="font-inter text-md font-semibold text-white mt-2">
                                        Claimed Orders
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-[1fr_2fr_2fr_2fr_2fr] p-2 text-black text-center gap-y-2 font-bold place-items-center mt-8">
                                <div className="w-full col-span-5">
                                    <hr className="w-full border-[1px] border-grey" />
                                </div>
                                <p className="text-center">No.</p>
                                <p className="text-center">Transaction ID</p>
                                <p className="text-center">Item ID</p>
                                <p className="text-center">Quantity</p>
                                <p className="text-center">Status</p>
                                <div className="w-full col-span-5">
                                    <hr className="w-full border-[1px] border-grey" />
                                </div>
                            </div>

                            {user.transactions.map((trx, index) => {
                                return (
                                    <div
                                        className="grid grid-cols-[1fr_2fr_2fr_2fr_2fr] text-black text-center gap-y-2 p-2 font-medium place-items-center"
                                        key={trx.id}>
                                        <p className="font-inter">
                                            {index + 1}.
                                        </p>
                                        <p className="font-inter">{trx.id}</p>
                                        <a
                                            href={`/products/${trx.item}`}
                                            className="font-inter text-blue underline">
                                            {trx.item}
                                        </a>
                                        <p className="font-inter">
                                            {trx.quantity}
                                        </p>
                                        <p className="font-inter">
                                            <span className="font-inter !font-bold bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                                                {trx.status}
                                            </span>
                                        </p>
                                        <div className="w-full col-span-5">
                                            <hr className="w-full border-[1px] border-grey" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex flex-row">
                        <div className="lg:shadow-custom font-inter flex flex-col w-full p-10 rounded-2xl">
                            <p className="text-5xl font-black mb-10 text-black">
                                Your Quest History
                            </p>
                            <div className="flex gap-4 justify-center items-center px-10">
                                <div className="w-40 h-40 bg-gradient-to-b from-red to-light-red rounded-xl flex flex-col justify-center items-center shadow-lg">
                                    <p className="font-inter text-4xl font-bold text-white">
                                        {
                                            userTasks.filter((userTask) =>
                                                allTasks.some(
                                                    (task) =>
                                                        task.id ===
                                                            userTask.task &&
                                                        userTask.status ===
                                                            'REJECTED'
                                                )
                                            ).length
                                        }
                                    </p>
                                    <p className="font-inter text-md font-semibold text-white mt-2">
                                        Rejected Quests
                                    </p>
                                </div>
                                <div className="w-40 h-40 bg-gradient-to-b from-orange-400 to-orange-300 rounded-xl flex flex-col justify-center items-center shadow-lg">
                                    <p className="font-inter text-4xl font-bold text-white">
                                        {
                                            userTasks.filter((userTask) =>
                                                allTasks.some(
                                                    (task) =>
                                                        task.id ===
                                                            userTask.task &&
                                                        userTask.status ===
                                                            'ONGOING'
                                                )
                                            ).length
                                        }
                                    </p>
                                    <p className="font-inter text-md text-white font-semibold mt-2">
                                        Pending Quests
                                    </p>
                                </div>
                                <div className="w-40 h-40 bg-gradient-to-b from-green to-light-green rounded-xl flex flex-col justify-center items-center shadow-lg">
                                    <p className="font-inter text-4xl font-bold text-white">
                                        {
                                            userTasks.filter((userTask) =>
                                                allTasks.some(
                                                    (task) =>
                                                        task.id ===
                                                            userTask.task &&
                                                        userTask.status ===
                                                            'COMPLETED'
                                                )
                                            ).length
                                        }
                                    </p>
                                    <p className="font-inter text-md text-white font-semibold mt-2">
                                        Claimed Quests
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-[1fr_3fr_2fr_3fr] text-black text-center  p-2  gap-y-2 font-bold place-items-center mt-8">
                                <div className="w-full col-span-4">
                                    <hr className="w-full border-[1px] border-grey" />
                                </div>
                                <p className="text-center">No.</p>
                                <p className="text-center">Quest ID</p>
                                <p className="text-center">Status</p>
                                <p className="text-center">End Date</p>
                                <div className="w-full col-span-4">
                                    <hr className="w-full border-[1px] border-grey" />
                                </div>
                            </div>
                            {userTasks.map((task, index) => {
                                const taskData = allTasks.filter(
                                    (filteredTask) =>
                                        filteredTask.id === task.task
                                );
                                return (
                                    <div
                                        className="grid grid-cols-[1fr_3fr_2fr_3fr] text-black text-center gap-y-2 p-2 font-medium place-items-center"
                                        key={task.id}>
                                        <p className="font-inter">
                                            {index + 1}.
                                        </p>
                                        <p className="font-inter">
                                            {taskData[0]?.name}
                                        </p>
                                        <p className="font-inter">
                                            <span className="font-inter !font-bold bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                                                {task.status}
                                            </span>
                                        </p>
                                        <p className="font-inter">
                                            {convertGMTToSGT(
                                                taskData[0]?.end_time
                                            )}
                                        </p>
                                        <div className="w-full col-span-4">
                                            <hr className="w-full border-[1px] border-grey" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </PageWithNavbar>
        </ProtectedRoute>
    );
};

export default Profile;
