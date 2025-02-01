'use client';
import PageWithNavbar from '@/app/components/PageWithNavbar';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { applyForTask, getAllTasks } from '@/lib/backend/tasks';
import { deleteUserTask, getAllUserTasks } from '@/lib/backend/usertasks';
import { useAppSelector } from '@/lib/hooks';
import { Task } from '@/lib/types/Task';
import { UserTask } from '@/lib/types/UserTask';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const IndividualQuestPage = () => {
    const { id }: { id: string } = useParams();

    const user = useAppSelector((state) => state.user);
    const session = useAppSelector((state) => state.session);

    const queryClient = useQueryClient();

    const convertGMTToSGT = (gmtDateString: Date | null | undefined) => {
        if (!gmtDateString) {
            return 'N/A';
        }
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

    const { data: task, isLoading: taskLoading } = useQuery({
        queryKey: ['allTasks', id],
        queryFn: () =>
            getAllTasks(session.jwt).then((data) => {
                const specificTask: Task = data.tasks.find((t) => t.id === id)!;
                return specificTask;
            }),
    });

    const { data: userTask, isLoading: userTaskLoading } =
        useQuery<UserTask | null>({
            queryKey: ['userTask', id, user.user.uid],
            queryFn: async () => {
                const data = await getAllUserTasks(session.jwt);
                const ut =
                    data.usertasks.find(
                        (ut: UserTask) =>
                            ut.task === id && ut.uid === user.user.uid
                    ) || null;
                return ut;
            },
            enabled: !!id && !!user.user.uid, // Only run if `id` & `user.user.uid` exist
        });

    const applyMutation = useMutation({
        mutationFn: () => applyForTask(session.jwt, user.user.uid, id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['userTask', id, user.user.uid],
            });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: () => deleteUserTask(session.jwt, userTask!.id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['userTask', id, user.user.uid],
            });
        },
    });

    if (taskLoading || userTaskLoading)
        return (
            <ProtectedRoute>
                <PageWithNavbar>
                    <p>Loading...</p>
                </PageWithNavbar>
            </ProtectedRoute>
        );

    // useEffect(() => {
    //     getAllUserTasks(session.jwt).then((data) => {
    //         console.log(data.usertasks);
    //         const specificUserTask = data.usertasks.filter(
    //             (ut: UserTask) => ut.task == id && ut.uid === user.user.uid
    //         );
    //         if (specificUserTask.length > 0) {
    //             setApplied(true);
    //             setUserTask(specificUserTask[0]);
    //         }
    //     });
    // }, [specificTask]);

    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <div className="font-inter p-8 flex-col flex gap-y-8">
                    <div>
                        <Link
                            href="/quests"
                            className="text-blue underline font-medium px-4 py-2 rounded-xl hover:font-bold transition-all ease-in">
                            {'< Back'}
                        </Link>
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
                                {userTask ? (
                                    <button
                                        className="bg-dark-grey text-white rounded-xl px-4 py-2 font-semibold"
                                        onClick={() => deleteMutation.mutate()}
                                        disabled={deleteMutation.isPending}>
                                        {deleteMutation.isPending
                                            ? 'Removing...'
                                            : 'APPLIED'}
                                    </button>
                                ) : (
                                    <button
                                        className="bg-blue rounded-xl text-white px-4 py-2 font-semibold"
                                        onClick={() => applyMutation.mutate()}
                                        disabled={applyMutation.isPending}>
                                        {applyMutation.isPending
                                            ? 'Applying...'
                                            : 'APPLY'}
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
