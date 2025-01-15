'use client';
import PageWithNavbar from '@/app/components/PageWithNavbar';
import { API_URL } from '@/app/constants';
import { Item } from '@/lib/types/Item';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProductPage = () => {
    const [count, setCount] = useState<number>(0);
    const [item, setItem] = useState<Item>();
    const [disablePlusButton, setDisablePlusButton] = useState<boolean>(false);
    const [disableMinusButton, setDisableMinusButton] = useState<boolean>(true);

    const { id } = useParams();

    const incrementCount = () => {
        setCount((count) => count + 1);
    };

    const decrementCount = () => {
        setCount((count) => count - 1);
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
        } else if (count >= (item?.stock || 100)) {
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
                        <button
                            className={`${
                                item?.stock == 0 ? 'bg-blue' : 'bg-green'
                            } text-white font-bold px-5 py-2.5 rounded-xl`}>
                            {item?.stock == 0 ? 'PREORDER' : 'ORDER NOW'}
                        </button>
                    </div>
                </div>
            </div>
        </PageWithNavbar>
    );
};

export default ProductPage;
