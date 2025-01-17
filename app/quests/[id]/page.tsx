'use client';
import PageWithNavbar from '@/app/components/PageWithNavbar';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { getAllTasks } from '@/lib/backend/tasks';
import { getAllUserTasks } from '@/lib/backend/usertasks';
import { useAppSelector } from '@/lib/hooks';
import { Task } from '@/lib/types/Task';
import { UserTask } from '@/lib/types/UserTask';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const IndividualQuestPage = () => {
    const { id }: { id: string } = useParams();

    const [task, setTask] = useState<Task>();
    const [userTask, setUserTask] = useState<UserTask>();
    const [applied, setApplied] = useState<boolean>(false);

    const user = useAppSelector((state) => state.user);
    const session = useAppSelector((state) => state.session);

    const convertGMTToSGT = (gmtDateString: string) => {
        // Parse the GMT date string into a Date object in UTC (GMT)
        const gmtDate = new Date(gmtDateString);
        // Format the date to SGT using the correct timezone (Asia/Singapore)
        const sgtFormatted = gmtDate.toLocaleString('en-SG', {
            timeZone: 'Asia/Singapore',
        });

        return sgtFormatted;
    };

    const statuses = [
        'APPLIED',
        'ONGOING',
        'UNDER_REVIEW',
        'REQUEST_RESUBMISSION',
        'COMPLETED',
        'REJECTED',
    ];

    const statusColorDict: { [key: string]: string } = {
        APPLIED: 'bg-dark-grey',
        ONGOING: 'bg-yellow',
        UNDER_REVIEW: 'bg-yellow',
        REQUEST_RESUBMISSION: 'bg-yellow',
        COMPLETED: 'bg-green',
        REJECTED: 'bg-red',
    };

    useEffect(() => {
        getAllTasks(session.jwt).then((data) => {
            const specificTask: Task[] = data.tasks.filter((t) => t.id === id);
            setTask(specificTask[0]);
        });
    }, []);

    useEffect(() => {
        getAllUserTasks(session.jwt).then((data) => {
            console.log(data.usertasks);
            const specificUserTask = data.usertasks.filter(
                (ut: UserTask) => ut.task == id && ut.uid === user.user.uid
            );
            if (specificUserTask.length > 0) {
                setApplied(true);
                setUserTask(specificUserTask[0]);
            }
        });
    }, [task]);

    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <div className="font-inter p-8 flex-col flex gap-y-8">
                    <div>
                        <a
                            href="/quests"
                            className="text-blue underline font-medium px-4 py-2 rounded-xl hover:font-bold transition-all ease-in">
                            {'< Back'}
                        </a>
                    </div>
                    <div className="bg-white p-8 shadow-custom rounded-xl flex flex-col gap-y-8 lg:gap-y-0 lg:flex-row lg:justify-between">
                        <div className="gap-y-8 flex flex-col">
                            <div className="flex flex-col gap-y-2">
                                <p className="font-bold text-dark-grey text-lg">
                                    Task ID - {task?.id}
                                </p>
                                <p className="font-black text-blue text-4xl">
                                    {task?.name}
                                </p>
                                <p className="font-medium text-dark-grey">
                                    Posted by User ID {task?.created_by}
                                </p>
                            </div>
                            <div className="font-bold text-black text-lg">
                                <p>
                                    Start time:{' '}
                                    <span className="font-medium">
                                        {convertGMTToSGT(task?.start_time)}
                                    </span>
                                </p>
                                <p>
                                    End time:{' '}
                                    <span className="font-medium">
                                        {convertGMTToSGT(task?.deadline)}
                                    </span>
                                </p>
                            </div>
                            <div>
                                {applied ? (
                                    <button
                                        disabled
                                        className="bg-dark-grey text-white rounded-xl px-4 py-2 font-semibold">
                                        APPLIED
                                    </button>
                                ) : (
                                    <button className="bg-blue rounded-xl text-white px-4 py-2 font-semibold">
                                        APPLY
                                    </button>
                                )}
                            </div>
                            <div>
                                <p className="font-semibold text-black text-lg">
                                    Task Description
                                </p>
                                <p className="text-black">
                                    {task?.description}
                                </p>
                            </div>
                        </div>
                        <div>
                            <div>
                                {userTask ? (
                                    <div className="gap-y-4 flex flex-col">
                                        <p className="font-bold text-black">
                                            Your current status:{' '}
                                            {userTask.status}
                                        </p>
                                        <div className="gap-y-2 flex flex-col">
                                            {statuses.map((st, index) => {
                                                return (
                                                    <div key={index + 1}>
                                                        <div className="flex gap-x-2 items-center">
                                                            <p className="text-white font-bold bg-blue rounded-full px-4 py-2">
                                                                {index + 1}
                                                            </p>
                                                            <p
                                                                className={`font-semibold text-white rounded-xl ${statusColorDict[st]} px-4 py-1`}>
                                                                {st}
                                                            </p>
                                                            {userTask.status ===
                                                            st ? (
                                                                <p className="font-medium text-black">
                                                                    You are
                                                                    currently
                                                                    here!
                                                                </p>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="gap-y-4 flex flex-col">
                                        <p className="font-bold text-black">
                                            Your current status: NOT APPLIED
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </PageWithNavbar>
        </ProtectedRoute>
    );
};

export default IndividualQuestPage;
