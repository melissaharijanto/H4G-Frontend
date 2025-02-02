'use client';
import PageWithNavbar from '@/app/components/PageWithNavbar';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { buyItem, getItemById, preorderItem } from '@/lib/backend/items';
import { getUser } from '@/lib/backend/users';
import { setUser } from '@/lib/features/userSlice';
import { useAppSelector, useAppStore } from '@/lib/hooks';
import { User } from '@/lib/types/User';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const ProductPage = () => {
    const user: User = useAppSelector((state) => state.user);
    const session = useAppSelector((state) => state.session);
    const store = useAppStore();
    const queryClient = useQueryClient();

    const [count, setCount] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const { id }: { id: string } = useParams();

    const { data: item, isLoading } = useQuery({
        queryKey: ['item', id],
        queryFn: () => getItemById(session.jwt, id).then((data) => data.item),
    });

    const buyMutation = useMutation({
        mutationFn: () => buyItem(session.jwt, user.user.uid, item!.id, count),
        onSuccess: async () => {
            setSuccessMessage('Transaction successful!');
            await queryClient.invalidateQueries({
                queryKey: ['item', id],
            });
            const updatedUser = await getUser(session.jwt, user.user.uid);
            console.log(updatedUser);
            store.dispatch(setUser(updatedUser));
        },
        onError: (error: any) => {
            setErrorMessage(error.message || 'Transaction failed.');
        },
    });

    const preorderMutation = useMutation({
        mutationFn: () =>
            preorderItem(session.jwt, user.user.uid, item!.id, count),
        onSuccess: () => {
            setSuccessMessage('Preorder successful!');
            const updatedUser = getUser(session.jwt, user.user.uid).then(
                (data) => data
            );
            store.dispatch(setUser(updatedUser));
        },
        onError: (error: any) => {
            setErrorMessage(error.message || 'Preorder failed.');
        },
    });

    const handleBuyItem = () => {
        setSuccessMessage(null);
        setErrorMessage(null);
        if (count <= 0) {
            setErrorMessage('Please buy or preorder at least 1 product.');
            return;
        }
        buyMutation.mutate();
    };

    const handlePreorderItem = () => {
        setSuccessMessage(null);
        setErrorMessage(null);
        if (count <= 0) {
            setErrorMessage('Please buy or preorder at least 1 product.');
            return;
        }
        preorderMutation.mutate();
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <div className="grid grid-cols-2 bg-off-white min-h-screen w-full gap-x-12 px-8">
                    <div className="flex items-center justify-center">
                        <img
                            src={item?.image}
                            alt={item?.name}
                            className="shadow-custom rounded-xl"
                        />
                    </div>
                    <div className="text-black font-inter flex flex-col gap-y-8 justify-center">
                        <div className="gap-y-2 flex flex-col">
                            <p className="font-semibold text-xl">
                                {item?.name}
                            </p>
                            <p className="font-black text-4xl">20 credits</p>
                            <p className="text-md text-dark-grey">
                                You currently have {user.user.credit}{' '}
                                {user.user.credit == 1 ? 'credit' : 'credits'}.
                            </p>
                        </div>
                        <div className="gap-y-2 flex flex-col">
                            <p className="font-semibold text-xl">
                                Product Description
                            </p>
                            <p>{item?.description}</p>
                        </div>
                        <div className="gap-y-2 flex flex-col">
                            <p className="font-semibold text-xl">Quantity</p>
                            <div className="w-full text-lg">
                                <div className="flex gap-x-4 items-center">
                                    <div className="flex border-2 border-dark-grey rounded-xl w-fit">
                                        <div className="border-r-2 border-dark-grey py-2 px-4">
                                            <button
                                                onClick={() =>
                                                    setCount(count - 1)
                                                }
                                                disabled={count <= 0}
                                                className="px-2 py-1 rounded-l-xl">
                                                -
                                            </button>
                                        </div>
                                        <div className="px-2 py-1 max-w-[8ch] flex">
                                            <input
                                                className="focus:outline-none bg-off-white w-full text-center appearance-none"
                                                value={count}
                                                onChange={(e) =>
                                                    setCount(
                                                        Math.max(
                                                            0,
                                                            parseInt(
                                                                e.target.value
                                                            ) || 0
                                                        )
                                                    )
                                                }
                                                type="number"
                                            />
                                        </div>
                                        <div className="border-l-2 border-dark-grey py-1 px-2">
                                            <button
                                                onClick={() =>
                                                    setCount(count + 1)
                                                }
                                                disabled={count >= item!.stock}
                                                className="px-4 py-2 rounded-r-xl">
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-lg">
                                            Current Stock:{' '}
                                            <span className="font-bold text-red">
                                                {item?.stock == 0
                                                    ? 'Out of Stock'
                                                    : `${item?.stock} left`}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            {item?.stock == 0 ? (
                                <button
                                    className="bg-blue text-white font-bold px-5 py-2.5 rounded-xl"
                                    onClick={handlePreorderItem}>
                                    PREORDER
                                </button>
                            ) : (
                                <button
                                    className="bg-green text-white font-bold px-5 py-2.5 rounded-xl"
                                    onClick={handleBuyItem}>
                                    ORDER NOW
                                </button>
                            )}
                        </div>
                        <div>
                            <p className="text-green font-medium">
                                {successMessage}
                            </p>
                            <p className="text-red font-medium">
                                {errorMessage}
                            </p>
                        </div>
                    </div>
                </div>
            </PageWithNavbar>
        </ProtectedRoute>
    );
};

export default ProductPage;
