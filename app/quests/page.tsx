'use client';
import { useEffect, useState } from 'react';
import SearchIcon from '../components/icons/SearchIcon';
import PageWithNavbar from '../components/PageWithNavbar';
import ProtectedRoute from '../components/ProtectedRoute';
import { applyForTask, getAllTasks } from '@/lib/backend/tasks';
import { useAppSelector } from '@/lib/hooks';
import { Task } from '@/lib/types/Task';
import { UserTask } from '@/lib/types/UserTask';
import { deleteUserTask, getAllUserTasks } from '@/lib/backend/usertasks';

const QuestsPage = () => {
    const [generalBoardSelected, setGeneralBoardSelected] =
        useState<boolean>(true);
    const [pendingQuestsSelected, setPendingQuestsSelected] =
        useState<boolean>(false);
    const [rejectedSelected, setRejectedQuestsSelected] =
        useState<boolean>(false);
    const [results, setResults] = useState<Task[] | UserTask[]>([]);
    const [generalBoardTasks, setGeneralBoardTasks] = useState<Task[]>([]);
    const [userTasks, setUserTasks] = useState<UserTask[]>([]);
    const [allTasks, setAllTasks] = useState<Task[]>([]);

    const user = useAppSelector((state) => state.user);
    const session = useAppSelector((state) => state.session);

    const handleSelection = (category: string) => {
        // Reset all categories to false
        setGeneralBoardSelected(false);
        setPendingQuestsSelected(false);
        setRejectedQuestsSelected(false);

        // Set the selected category to true
        if (category === 'generalBoard') {
            setGeneralBoardSelected(true);
            setResults(generalBoardTasks);
        } else if (category === 'pendingQuests') {
            setPendingQuestsSelected(true);
            setResults(
                userTasks.filter(
                    (task: UserTask) =>
                        task.status === 'APPLIED' ||
                        task.status === 'ONGOING' ||
                        task.status === 'UNDER_REVIEW'
                )
            );
        } else if (category === 'rejected') {
            setRejectedQuestsSelected(true);
            setResults(
                userTasks.filter((task: UserTask) => task.status === 'REJECTED')
            );
        }
    };

    function isUserTask(task: Task | UserTask): task is UserTask {
        return (task as UserTask).task !== undefined; // Check for the presence of 'task' property
    }

    const applyForTaskAndUiUpdates = (taskId: string) => {
        applyForTask(session.jwt, user.user.uid, taskId).then((data) => {
            if (data.success) {
                getAllUserTasks(session.jwt).then((data) => {
                    setUserTasks(
                        data.usertasks.filter((ut) => ut.uid === user.user.uid)
                    );
                    console.log(data);
                });
            }
        });
    };

    const deleteUserTaskAndUpdateUi = (userTaskId: string) => {
        deleteUserTask(session.jwt, userTaskId).then((data) => {
            if (data.success) {
                getAllUserTasks(session.jwt).then((data) => {
                    setUserTasks(
                        data.usertasks.filter((ut) => ut.uid === user.user.uid)
                    );
                });
            }
        });
    };

    useEffect(() => {
        getAllUserTasks(session.jwt).then((data) => {
            setUserTasks(
                data.usertasks.filter((ut) => ut.uid === user.user.uid)
            );
            console.log(data);
        });
    }, []);

    useEffect(() => {
        if (generalBoardSelected) {
            getAllTasks(session.jwt).then((data) => {
                console.log(data);

                const tasks = data.tasks;
                const assignedTaskIds = userTasks
                    .filter((userTask) => userTask.uid === user.user.uid)
                    .map((userTask) => userTask.task);

                // Filter the tasks to exclude those assigned to user u0001
                const filteredTasks = tasks.filter(
                    (task) => !assignedTaskIds.includes(task.id)
                );

                setGeneralBoardTasks(filteredTasks);
                setResults(filteredTasks);
                setAllTasks(data.tasks);
            });
        } else if (pendingQuestsSelected) {
            const assignedTaskIds = userTasks
                .filter((userTask) => userTask.uid === 'u0001')
                .map((userTask) => userTask.task);

            // Filter the tasks to exclude those assigned to user u0001
            const filteredTasks = allTasks.filter(
                (task) => !assignedTaskIds.includes(task.id)
            );

            setGeneralBoardTasks(filteredTasks);
            setResults(userTasks);
        }
    }, [userTasks]);

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
                                pendingQuestsSelected
                                    ? '!text-blue underline'
                                    : ''
                            }`}
                            onClick={() => handleSelection('pendingQuests')}>
                            Pending Quests
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
                            <p>Deadline</p>
                            <p>Status</p>
                        </div>
                        {results.length == 0 ? (
                            <div className="pt-4">
                                <p className="text-dark-grey font-medium">
                                    {generalBoardSelected
                                        ? 'There are currently no quests available.'
                                        : pendingQuestsSelected
                                        ? 'You do not have any pending quests at the moment.'
                                        : rejectedSelected
                                        ? 'You do not have any rejected quests.'
                                        : null}
                                </p>
                            </div>
                        ) : (
                            results.map((task, index) => {
                                let taskData: Task[];
                                if (isUserTask(task)) {
                                    taskData = allTasks.filter(
                                        (generalTask) =>
                                            generalTask.id === task.task
                                    );
                                }

                                return (
                                    <div
                                        className={`grid grid-cols-[1fr_2fr_2fr_2fr_2fr] text-black font-medium place-items-center bg-white ${
                                            index === 0 ? 'pt-4' : 'pt-2'
                                        } pb-2 gap-y-4`}
                                        key={task.id}>
                                        <p>{index + 1}</p>
                                        <a
                                            href={
                                                isUserTask(task)
                                                    ? `/quests/${
                                                          taskData![0].id
                                                      }`
                                                    : `/quests/${task.id}`
                                            }
                                            className="!font-bold !text-blue underline">
                                            {isUserTask(task)
                                                ? taskData![0].id
                                                : task.id}
                                        </a>
                                        <p>
                                            {(task as Task).name ||
                                                taskData![0].name}
                                        </p>
                                        <p>
                                            {isUserTask(task)
                                                ? new Date(
                                                      taskData![0].deadline
                                                  ).toLocaleString('en-SG', {
                                                      timeZone:
                                                          'Asia/Singapore',
                                                  })
                                                : new Date(
                                                      task.deadline
                                                  ).toLocaleString('en-SG', {
                                                      timeZone:
                                                          'Asia/Singapore',
                                                  })}
                                        </p>
                                        {generalBoardSelected ? (
                                            <button
                                                className="bg-blue px-4 py-2 font-semibold rounded-xl text-white"
                                                onClick={() =>
                                                    isUserTask(task)
                                                        ? applyForTaskAndUiUpdates(
                                                              task.task
                                                          )
                                                        : applyForTaskAndUiUpdates(
                                                              task.id
                                                          )
                                                }>
                                                APPLY
                                            </button>
                                        ) : pendingQuestsSelected ? (
                                            <>
                                                {isUserTask(task) &&
                                                task.status === 'APPLIED' ? (
                                                    <button
                                                        className="font-semibold text-white bg-dark-grey px-4 py-2 rounded-xl"
                                                        onClick={() =>
                                                            deleteUserTaskAndUpdateUi(
                                                                task.id
                                                            )
                                                        }>
                                                        APPLIED
                                                    </button>
                                                ) : (
                                                    <p className="bg-yellow px-4 py-2 font-semibold rounded-xl text-white">
                                                        {
                                                            (task as UserTask)
                                                                .status
                                                        }
                                                    </p>
                                                )}
                                            </>
                                        ) : rejectedSelected ? (
                                            <p className="bg-red px-4 py-2 font-semibold rounded-xl text-white">
                                                REJECTED
                                            </p>
                                        ) : null}
                                        {index === results.length - 1 ? null : (
                                            <div className="col-span-5 w-full">
                                                <hr className="border-[1px] border-grey" />
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        )}

                        <div className="bg-white rounded-b-xl p-2"></div>
                    </div>
                </div>
            </PageWithNavbar>
        </ProtectedRoute>
    );
};

export default QuestsPage;
