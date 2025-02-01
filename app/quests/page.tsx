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
import { useMutation, useQuery } from '@tanstack/react-query';

const QuestsPage = () => {
    const [generalBoardSelected, setGeneralBoardSelected] =
        useState<boolean>(true);
    const [pendingQuestsSelected, setPendingQuestsSelected] =
        useState<boolean>(false);
    const [rejectedSelected, setRejectedQuestsSelected] =
        useState<boolean>(false);
    const [results, setResults] = useState<Task[] | UserTask[]>([]);
    const [generalBoardTasks, setGeneralBoardTasks] = useState<Task[]>([]);
    const [allTasks, setAllTasks] = useState<Task[]>([]);

    const user = useAppSelector((state) => state.user);
    const session = useAppSelector((state) => state.session);

    // Fetch user tasks using react-query
    const { data: userTasksData, refetch: refetchUserTasks } = useQuery({
        queryKey: ['userTasks'],
        queryFn: () => getAllUserTasks(session.jwt),
        enabled: !!session.jwt, // Only run the query if there's a valid JWT session
    });

    // Fetch all tasks using react-query
    const { data: allTasksData } = useQuery({
        queryKey: ['allTasks'],
        queryFn: () => getAllTasks(session.jwt),
        enabled: !!session.jwt,
    });

    const applyForTaskMutation = useMutation({
        mutationFn: (taskId: string) =>
            applyForTask(session.jwt, user.user.uid, taskId),
        onMutate: async (taskId: string) => {
            const previousResults = [...results];

            setResults((oldResults) => {
                if (oldResults.length > 0 && 'name' in oldResults[0]) {
                    return (oldResults as Task[]).filter(
                        (task) => task.id !== taskId
                    );
                }
                return oldResults;
            });

            return { previousResults };
        },
        onSuccess: () => {
            refetchUserTasks();
        },
    });

    const deleteUserTaskMutation = useMutation({
        mutationFn: (userTaskId: string) =>
            deleteUserTask(session.jwt, userTaskId),
        onMutate: async (userTaskId: string) => {
            const previousResults = [...results];

            setResults((oldResults) => {
                if (oldResults.length > 0 && 'task' in oldResults[0]) {
                    return (oldResults as UserTask[]).filter(
                        (task) => task.id !== userTaskId
                    );
                }
                return oldResults;
            });

            return { previousResults };
        },
        onSuccess: () => {
            refetchUserTasks();
        },
    });

    const handleSelection = (category: string) => {
        setGeneralBoardSelected(false);
        setPendingQuestsSelected(false);
        setRejectedQuestsSelected(false);

        if (category === 'generalBoard') {
            setGeneralBoardSelected(true);
            setResults(generalBoardTasks);
        } else if (category === 'pendingQuests') {
            setPendingQuestsSelected(true);
            setResults(
                userTasksData?.usertasks.filter(
                    (task: UserTask) =>
                        (task.status === 'APPLIED' ||
                            task.status === 'ONGOING' ||
                            task.status === 'UNDER_REVIEW') &&
                        task.uid === user.user.uid
                ) || []
            );
        } else if (category === 'rejected') {
            setRejectedQuestsSelected(true);
            setResults(
                userTasksData?.usertasks.filter(
                    (task: UserTask) =>
                        task.status === 'REJECTED' && task.uid === user.user.uid
                ) || []
            );
        }
    };

    function isUserTask(task: Task | UserTask): task is UserTask {
        return (task as UserTask).task !== undefined;
    }

    const applyForTaskAndUiUpdates = (taskId: string) => {
        applyForTaskMutation.mutate(taskId);
    };

    const deleteUserTaskAndUpdateUi = (userTaskId: string) => {
        deleteUserTaskMutation.mutate(userTaskId);
    };

    useEffect(() => {
        if (generalBoardSelected && allTasksData && userTasksData) {
            const tasks = allTasksData.tasks;
            const assignedTaskIds = userTasksData.usertasks
                .filter((userTask) => userTask.uid === user.user.uid)
                .map((userTask) => userTask.task);

            const filteredTasks = tasks.filter(
                (task) => !assignedTaskIds.includes(task.id)
            );

            setGeneralBoardTasks(filteredTasks);
            setResults(filteredTasks);
            setAllTasks(tasks);
        } else if (pendingQuestsSelected && userTasksData) {
            const pendingTasks = userTasksData.usertasks.filter(
                (userTask) =>
                    userTask.uid === user.user.uid &&
                    (userTask.status === 'APPLIED' ||
                        userTask.status === 'ONGOING' ||
                        userTask.status === 'UNDER_REVIEW')
            );
            setResults(pendingTasks);
        } else if (rejectedSelected && userTasksData) {
            const rejectedTasks = userTasksData.usertasks.filter(
                (userTask) =>
                    userTask.uid === user.user.uid &&
                    userTask.status === 'REJECTED'
            );
            setResults(rejectedTasks);
        }
    }, [
        generalBoardSelected,
        pendingQuestsSelected,
        allTasksData,
        rejectedSelected,
        user.user.uid,
        userTasksData,
    ]);

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
                            <p>Quest ID</p>
                            <p>Quest Name</p>
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
                                let taskData: Task[] = [];
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
                                                      taskData?.[0]?.deadline ??
                                                          ''
                                                  ).toLocaleString('en-SG', {
                                                      timeZone:
                                                          'Asia/Singapore',
                                                  })
                                                : new Date(
                                                      task?.deadline ?? ''
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
