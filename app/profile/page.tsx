'use client';
import { useAppSelector, useAppStore } from '@/lib/hooks';
import PageWithNavbar from '../components/PageWithNavbar';
import { getAllTasks } from '@/lib/backend/tasks';
import { UserTask } from '@/lib/types/UserTask';
import { clearUser } from '@/lib/features/userSlice';
import { clearJwt } from '@/lib/features/sessionSlice';
import ProtectedRoute from '../components/ProtectedRoute';
import { getAllUserTasks } from '@/lib/backend/usertasks';
import { useQuery } from '@tanstack/react-query';

const Profile = () => {
    const user = useAppSelector((state) => state.user);
    const session = useAppSelector((state) => state.session);
    const store = useAppStore();

    const {
        data: uts,
        isLoading: isUtsLoading,
        error: utsError,
    } = useQuery({
        queryKey: ['userTasks'],
        queryFn: () => getAllUserTasks(session.jwt),
    });

    const {
        data: ts,
        isLoading: areTasksLoading,
        error: tasksError,
    } = useQuery({
        queryKey: ['tasks'],
        queryFn: () => getAllTasks(session.jwt),
    });

    const convertGMTToSGT = (gmtDateString: string) => {
        // Parse the GMT date string into a Date object in UTC (GMT)
        const gmtDate = new Date(gmtDateString);
        // Format the date to SGT using the correct timezone (Asia/Singapore)
        const sgtFormatted = gmtDate.toLocaleString('en-SG', {
            timeZone: 'Asia/Singapore',
        });

        return sgtFormatted;
    };

    const logOut = () => {
        // redirect('/');
        store.dispatch(clearUser());
        store.dispatch(clearJwt());
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
                                        uts?.usertasks.filter(
                                            (task: UserTask) =>
                                                task.uid === user.user.uid
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

                            <div className="grid grid-cols-[2fr_3fr_2fr_3fr] text-black p-2 text-center gap-y-2 font-bold place-items-center">
                                <div className="w-full col-span-4">
                                    <hr className="w-full border-[1px] border-grey" />
                                </div>
                                <p className="text-center">Quest ID</p>
                                <p className="text-center">Quest Name</p>
                                <p className="text-center">Status</p>
                                <p className="text-center">End Date</p>
                                <div className="w-full col-span-4">
                                    <hr className="w-full border-[1px] border-grey" />
                                </div>
                            </div>
                            {uts?.usertasks.slice(0, 5).map((task, index) => {
                                const taskData = ts?.tasks.filter(
                                    (filteredTask) =>
                                        filteredTask.id === task.task &&
                                        (task.status === 'ONGOING' ||
                                            task.status == 'APPLIED') &&
                                        task.uid == user.user.uid
                                );

                                if (taskData && taskData.length == 0) {
                                    return null;
                                }

                                return (
                                    <div
                                        className="grid grid-cols-[2fr_3fr_2fr_3fr] text-black text-center gap-y-2 p-2 font-medium place-items-center"
                                        key={task.id}>
                                        <p className="font-inter">
                                            {taskData && taskData[0].id}
                                        </p>
                                        <p className="font-inter">
                                            {taskData && taskData[0].name}
                                        </p>
                                        <p className="font-inter">
                                            <span className="font-inter !font-bold bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                                                {task.status}
                                            </span>
                                        </p>
                                        <p className="font-inter">
                                            {taskData &&
                                                convertGMTToSGT(
                                                    taskData[0].deadline!.toLocaleString()
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
                                                {trx.id.length > 6
                                                    ? `${trx.id.slice(0, 6)}...`
                                                    : trx.id}
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
                                            uts?.usertasks.filter((userTask) =>
                                                ts?.tasks.some(
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
                                            uts?.usertasks.filter(
                                                (ut) =>
                                                    ut.uid === user.user.uid &&
                                                    (ut.status === 'ONGOING' ||
                                                        ut.status ===
                                                            'APPLIED' ||
                                                        ut.status ===
                                                            'UNDER_REVIEW')
                                            ).length
                                        }
                                    </p>
                                    <p className="font-inter text-md text-white font-semibold mt-2">
                                        Ongoing Quests
                                    </p>
                                </div>
                                <div className="w-40 h-40 bg-gradient-to-b from-green to-light-green rounded-xl flex flex-col justify-center items-center shadow-lg">
                                    <p className="font-inter text-4xl font-bold text-white">
                                        {
                                            uts?.usertasks.filter(
                                                (ut) =>
                                                    ut.uid === user.user.uid &&
                                                    ut.status === 'CLAIMED'
                                            ).length
                                        }
                                    </p>
                                    <p className="font-inter text-md text-white font-semibold mt-2">
                                        Claimed Quests
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-[1fr_2fr_3fr_2fr_3fr] text-black text-center  p-2  gap-y-2 font-bold place-items-center mt-8">
                                <div className="w-full col-span-5">
                                    <hr className="w-full border-[1px] border-grey" />
                                </div>
                                <p className="text-center">No.</p>
                                <p className="text-center">Quest ID</p>
                                <p className="text-center">Quest Name</p>
                                <p className="text-center">Status</p>
                                <p className="text-center">End Date</p>
                                <div className="w-full col-span-5">
                                    <hr className="w-full border-[1px] border-grey" />
                                </div>
                            </div>
                            {uts?.usertasks
                                .filter((ut) => ut.uid === user.user.uid)
                                .map((task, index) => {
                                    const taskData = ts?.tasks.filter(
                                        (filteredTask) =>
                                            filteredTask.id === task.task
                                    );
                                    return (
                                        <div
                                            className="grid grid-cols-[1fr_2fr_3fr_2fr_3fr] text-black text-center gap-y-2 p-2 font-medium place-items-center"
                                            key={task.id}>
                                            <p className="font-inter">
                                                {index + 1}.
                                            </p>
                                            <a
                                                href={
                                                    taskData
                                                        ? `quests/${taskData[0].id}`
                                                        : ''
                                                }
                                                className="font-inter text-blue underline">
                                                {taskData && taskData[0].id}
                                            </a>
                                            <p className="font-inter">
                                                {taskData && taskData[0].name}
                                            </p>
                                            <p className="font-inter">
                                                <span className="font-inter !font-bold bg-orange-300 text-white px-2 py-1 rounded-md text-sm">
                                                    {task.status}
                                                </span>
                                            </p>
                                            <p className="font-inter">
                                                {taskData &&
                                                    convertGMTToSGT(
                                                        taskData[0].deadline!.toLocaleString()
                                                    )}
                                            </p>
                                            <div className="w-full col-span-5">
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
