'use client';
import { useEffect, useState } from 'react';
import SearchIcon from '../components/icons/SearchIcon';
import PageWithNavbar from '../components/PageWithNavbar';
import ProtectedRoute from '../components/ProtectedRoute';
import { getAllTaskPostings, getAllTasks } from '@/lib/backend/tasks';
import { useAppSelector } from '@/lib/hooks';
import { Task } from '@/lib/types/Task';

const QuestsPage = () => {
    const [generalBoardSelected, setGeneralBoardSelected] =
        useState<boolean>(true);
    const [assignedQuestsSelected, setAssignedQuestsSelected] =
        useState<boolean>(false);
    const [rejectedSelected, setRejectedQuestsSelected] =
        useState<boolean>(false);
    const [results, setResults] = useState([]);
    const [generalBoardTasks, setGeneralBoardTasks] = useState<Task[]>([]);
    const [userTasks, setUserTasks] = useState([]);

    const session = useAppSelector((state) => state.session);

    const handleSelection = (category: string) => {
        // Reset all categories to false
        setGeneralBoardSelected(false);
        setAssignedQuestsSelected(false);
        setRejectedQuestsSelected(false);

        // Set the selected category to true
        if (category === 'generalBoard') {
            setGeneralBoardSelected(true);
        } else if (category === 'assignedQuests') {
            setAssignedQuestsSelected(true);
        } else if (category === 'rejected') {
            setRejectedQuestsSelected(true);
        }
    };

    useEffect(() => {
        getAllTasks(session.jwt).then((data) => {
            console.log(data);
            setGeneralBoardTasks(data.tasks);
        });
    }, []);

    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <div className="shadow-custom bg-white m-8 p-8 flex flex-col gap-y-4 font-inter rounded-xl">
                    <div className="flex gap-x-12 font-bold text-dark-grey">
                        <button
                            className={`${
                                generalBoardSelected
                                    ? '!text-blue underline'
                                    : ''
                            }`}
                            onClick={() => handleSelection('generalBoard')}>
                            General Board
                        </button>
                        <button
                            className={`${
                                assignedQuestsSelected
                                    ? '!text-blue underline'
                                    : ''
                            }`}
                            onClick={() => handleSelection('assignedQuests')}>
                            Assigned Quests
                        </button>
                        <button
                            className={`${
                                rejectedSelected ? '!text-blue underline' : ''
                            }`}
                            onClick={() => handleSelection('rejected')}>
                            Rejected
                        </button>
                    </div>
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
                    <div className="border-2 border-grey rounded-xl text-center">
                        <div className="grid grid-cols-[1fr_2fr_2fr_2fr_2fr] py-4 text-black font-bold place-items-center bg-input rounded-t-xl">
                            <p>No.</p>
                            <p>Task ID</p>
                            <p>Task Name</p>
                            <p>End Time</p>
                            <p>Status</p>
                        </div>
                        {generalBoardTasks.map((task, index) => (
                            <div
                                className="grid grid-cols-[1fr_2fr_2fr_2fr_2fr] text-black font-medium place-items-center bg-white py-4 gap-y-4"
                                key={task.id}>
                                <p>{index + 1}</p>
                                <p>{task.id}</p>
                                <p>{task.name}</p>
                                <p>{task.end_time}</p>
                                <p></p>
                                <div className="col-span-5 w-full">
                                    <hr className="border-[1px] border-grey" />
                                </div>
                            </div>
                        ))}

                        <div className="bg-white rounded-b-xl p-2"></div>
                    </div>
                </div>
            </PageWithNavbar>
        </ProtectedRoute>
    );
};

export default QuestsPage;
