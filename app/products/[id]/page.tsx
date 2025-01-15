'use client';
import PageWithNavbar from '@/app/components/PageWithNavbar';
import { API_URL } from '@/app/constants';
import { useAppSelector } from '@/lib/hooks';
import { Item } from '@/lib/types/Item';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProductPage = () => {
    const [count, setCount] = useState<number>(0);
    const [item, setItem] = useState<Item>();
    const [disablePlusButton, setDisablePlusButton] = useState<boolean>(false);
    const [disableMinusButton, setDisableMinusButton] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const session = useAppSelector((state) => state.session);
    const user = useAppSelector((state) => state.user);

    const { id } = useParams();

    const incrementCount = () => {
        setCount((count) => count + 1);
    };

    const decrementCount = () => {
        setCount((count) => count - 1);
    };

    const buyItem = () => {
        setSuccessMessage(null);
        setErrorMessage(null);
        if (count <= 0) {
            setErrorMessage('Please buy or preorder at least 1 product.');
            return;
        } else {
            fetch(`${API_URL}/items/buy`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.jwt}`,
                },
                method: 'POST',
                body: JSON.stringify({
                    id: item!.id,
                    quantity: count,
                    uid: user.user.uid,
                }),
            })
                .then((resp) => resp.json())
                .then((data) => {
                    if (!data.success) {
                        setErrorMessage(data.message);
                        return;
                    } else {
                        setSuccessMessage('Transaction successful!');
                    }
                });
        }
    };

    const preorderItem = () => {
        setSuccessMessage(null);
        setErrorMessage(null);
        if (count <= 0) {
            setErrorMessage('Please buy or preorder at least 1 product.');
            return;
        } else {
            fetch(`${API_URL}/items/preorder`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.jwt}`,
                },
                method: 'POST',
                body: JSON.stringify({
                    id: item!.id,
                    quantity: count,
                    uid: user.user.uid,
                }),
            })
                .then((resp) => resp.json())
                .then((data) => console.log(data));
        }
    };

    useEffect(() => {
        fetch(`${API_URL}/items/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setItem(data.item);
            });
    }, []);

    useEffect(() => {
        setDisableMinusButton(false);
        setDisablePlusButton(false);
        if (count <= 0) {
            setDisableMinusButton(true);
        } else if (count >= (item?.stock || 100) && item!.stock > 0) {
            setDisablePlusButton(true);
        }
    }, [count]);

    return (
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
                        <p className="font-semibold text-xl">{item?.name}</p>
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
                            <div className="flex gap-x-4">
                                <div className="flex border-2 border-dark-grey rounded-xl w-fit">
                                    <div className=" border-r-2 border-dark-grey py-2 px-4">
                                        <button
                                            onClick={decrementCount}
                                            disabled={disableMinusButton}>
                                            -
                                        </button>
                                    </div>
                                    <div className="px-4 py-2 max-w-[8ch] flex">
                                        <input
                                            style={{
                                                MozAppearance: 'textfield', // Firefox
                                                WebkitAppearance: 'none', // Chrome, Safari
                                            }}
                                            className="focus:outline-none bg-off-white w-full text-center appearance-none"
                                            value={count}
                                            onChange={(e) => {
                                                if (
                                                    parseInt(e.target.value) < 0
                                                ) {
                                                    setCount(count);
                                                } else {
                                                    setCount(
                                                        parseInt(
                                                            e.target.value
                                                        ) || 0
                                                    );
                                                }
                                            }}
                                            type="number"
                                        />
                                    </div>
                                    <div className="border-l-2 border-dark-grey py-2 px-4">
                                        <button
                                            onClick={incrementCount}
                                            disabled={disablePlusButton}>
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
                                onClick={preorderItem}>
                                PREORDER
                            </button>
                        ) : (
                            <button
                                className="bg-green text-white font-bold px-5 py-2.5 rounded-xl"
                                onClick={buyItem}>
                                ORDER NOW
                            </button>
                        )}
                    </div>
                    <div>
                        <p className="text-green font-medium">
                            {successMessage}
                        </p>
                        <p className="text-red font-medium">{errorMessage}</p>
                    </div>
                </div>
            </div>
        </PageWithNavbar>
    );
};

export default ProductPage;
