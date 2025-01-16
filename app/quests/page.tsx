'use client';
import { useState } from 'react';
import SearchIcon from '../components/icons/SearchIcon';
import PageWithNavbar from '../components/PageWithNavbar';

const QuestsPage = () => {
    const [generalBoardSelected, setGeneralBoardSelected] =
        useState<boolean>(true);
    const [dailyQuestsSelected, setDailyQuestsSelected] =
        useState<boolean>(false);
    const [assignedQuestsSelected, setAssignedQuestsSelected] =
        useState<boolean>(false);
    const [rejectedSelected, setRejectedQuestsSelected] =
        useState<boolean>(false);

    const handleSelection = (category: string) => {
        // Reset all categories to false
        setGeneralBoardSelected(false);
        setDailyQuestsSelected(false);
        setAssignedQuestsSelected(false);
        setRejectedQuestsSelected(false);

        // Set the selected category to true
        if (category === 'generalBoard') {
            setGeneralBoardSelected(true);
        } else if (category === 'dailyQuests') {
            setDailyQuestsSelected(true);
        } else if (category === 'assignedQuests') {
            setAssignedQuestsSelected(true);
        } else if (category === 'rejected') {
            setRejectedQuestsSelected(true);
        }
    };

    return (
        <PageWithNavbar>
            <div className="shadow-custom bg-white m-8 p-8 flex flex-col gap-y-4 font-inter rounded-xl">
                <div className="flex gap-x-12 font-bold text-dark-grey">
                    <button
                        className={`${
                            generalBoardSelected ? '!text-blue underline' : ''
                        }`}
                        onClick={() => handleSelection('generalBoard')}>
                        General Board
                    </button>
                    <button
                        className={`${
                            dailyQuestsSelected ? '!text-blue underline' : ''
                        }`}
                        onClick={() => handleSelection('dailyQuests')}>
                        Daily Quests
                    </button>
                    <button
                        className={`${
                            assignedQuestsSelected ? '!text-blue underline' : ''
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
                <div className="border-2 border-grey rounded-xl">
                    <div className="grid grid-cols-[1fr_2fr_1fr_2fr] p-2 text-black font-bold place-items-center bg-input rounded-t-xl">
                        <p>Task ID</p>
                        <p>Task Name</p>
                        <p>Number of People Needed</p>
                        <p>Status</p>
                    </div>
                    <div className="grid grid-cols-[1fr_2fr_1fr_2fr] text-black font-medium place-items-center bg-white p-2">
                        <p>Task ID</p>
                        <p>Task Name</p>
                        <p>Number of People Needed</p>
                        <p>Status</p>
                    </div>
                    <div className="bg-white rounded-b-xl p-2"></div>
                </div>
            </div>
        </PageWithNavbar>
    );
};

export default QuestsPage;
