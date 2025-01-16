'use client';
import { useState } from 'react';
import PageWithNavbar from '../components/PageWithNavbar';
import { useAppSelector } from '@/lib/hooks';
import { addItemRequest } from '@/lib/backend/itemrequests';
import ProtectedRoute from '../components/ProtectedRoute';

const Request = () => {
    const user = useAppSelector((state) => state.user);
    const session = useAppSelector((state) => state.session);
    const [itemDesc, setItemDesc] = useState<string>('');
    const [itemName, setItemName] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const submitRequest = () => {
        setErrorMessage(null);
        setSuccessMessage(null);
        if (itemName?.trim() == '') {
            setErrorMessage(
                'Please enter an item name. Description is optional.'
            );
            return;
        } else {
            const completeDescription = `
                Item: ${itemName}\n
                ${itemDesc}
            `;
            addItemRequest(
                session.jwt,
                user.user.uid,
                completeDescription.trim()
            )
                .then((data) => {
                    if (!data.success) {
                        setErrorMessage(data.message);
                    } else {
                        setItemName('');
                        setItemDesc('');
                        setSuccessMessage('Request sent successfully.');
                    }
                    return;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <div className="w-screen min-h-screen bg-white lg:bg-off-white flex lg:flex-row flex-col">
                    <div className="w-full lg:w-1/2 lg:h-screen bg-cover bg-no-repeat bg-center flex flex-col justify-center items-start pl-20">
                        <p className="font-inter font-bold tracking-tight text-2xl text-red mb-2">
                            Cannot find what you&apos;re looking for?
                        </p>
                        <p className="font-inter text-blue font-bold tracking-tight text-4xl lg:text-6xl">
                            Request an Item
                        </p>
                    </div>
                    <div className="w-full lg:w-1/2 flex items-center justify-center">
                        <div className="bg-white lg:shadow-custom font-inter flex flex-col w-full m-4 lg:m-28 p-12 rounded-2xl gap-y-8 flex items-center justify-center">
                            <div className="gap-y-4 flex flex-col w-full justify-center items-center">
                                <div>
                                    <p className="text-5xl font-black text-blue text-center">
                                        Item Request Form
                                    </p>
                                </div>
                            </div>
                            <div className="w-full flex flex-col gap-y-4 text-sm">
                                <div className="flex flex-col w-full mb-1">
                                    <label className="text-black font-medium">
                                        Item Name
                                    </label>
                                    <input
                                        placeholder="Enter the item name here"
                                        value={itemName}
                                        onChange={(e) =>
                                            setItemName(e.target.value)
                                        }
                                        className="w-full bg-input px-5 py-2.5 rounded-xl text-black"></input>
                                </div>

                                <div className="flex flex-col w-full">
                                    <label className="text-black font-medium mb-1">
                                        Anything you want to tell us?
                                    </label>
                                    <textarea
                                        placeholder="E.g. Why do you want this item?"
                                        value={itemDesc}
                                        onChange={(e) =>
                                            setItemDesc(e.target.value)
                                        }
                                        className="w-full bg-input px-5 py-4 rounded-xl text-black h-52 placeholder-top"></textarea>
                                </div>
                            </div>
                            <button
                                className="bg-blue text-white rounded-xl px-5 py-2.5 font-semibold font-white text-sm"
                                onClick={submitRequest}>
                                SUBMIT
                            </button>
                            {errorMessage ? (
                                <p className="text-red">{errorMessage}</p>
                            ) : null}
                            {successMessage ? (
                                <p className="text-green">{successMessage}</p>
                            ) : null}
                        </div>
                    </div>
                </div>
            </PageWithNavbar>
        </ProtectedRoute>
    );
};

export default Request;
