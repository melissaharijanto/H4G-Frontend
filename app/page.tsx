'use client';

import { useState } from 'react';
import { API_URL } from './constants';
import { setJwt } from '@/lib/features/sessionSlice';
import { useAppStore } from '@/lib/hooks';
import { useRouter } from 'next/navigation';

const Login = () => {
    const store = useAppStore();
    const router = useRouter();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const logIn = () => {
        setErrorMessage(null);
        fetch(`${API_URL}/login`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((resp) => {
                return resp.json(); // show error message
            })
            .then((data) => {
                console.log(data);
                store.dispatch(
                    setJwt({
                        jwt: data.token,
                    })
                );
                return router.push('/home');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="w-screen min-h-screen bg-white lg:bg-off-white flex lg:flex-row flex-col">
            <div className="w-full lg:w-1/2 lg:h-screen bg-[url('/gradient.png')] bg-cover bg-no-repeat bg-center flex justify-center items-center">
                <p className="font-inter font-bold tracking-tight text-4xl lg:text-6xl p-8 font-white">
                    Welcome to <br />
                    Muhammadiyah
                    <br />
                    Welfare Home&apos;s
                    <br /> Minimart!
                </p>
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center">
                <div className="bg-white lg:shadow-custom font-inter flex flex-col w-full m-4 lg:m-28 p-12 rounded-2xl gap-y-8 flex items-center justify-center">
                    <div className="gap-y-4 flex flex-col w-full justify-center items-center">
                        <img
                            src="/mwh-logo.png"
                            alt="Welfare Home Logo"
                            className="w-52"
                        />
                        <p className="text-3xl lg:text-5xl font-black text-blue text-center">
                            Welcome Back
                        </p>
                    </div>
                    <div className="w-full flex flex-col gap-y-4 text-sm">
                        <div className="flex flex-col w-full mb-1">
                            <label className="text-black font-medium">
                                Email
                            </label>
                            <input
                                placeholder="Enter your email here."
                                className="w-full bg-input px-5 py-2.5 rounded-xl text-black"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col w-full">
                            <label className="text-black font-medium mb-1">
                                Password
                            </label>
                            <input
                                placeholder="Enter your password here."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="w-full bg-input px-5 py-2.5 rounded-xl text-black"></input>
                        </div>
                    </div>
                    <button
                        className="bg-red rounded-xl px-5 py-2.5 font-semibold font-white text-sm font-white"
                        onClick={logIn}>
                        LOGIN
                    </button>
                    {errorMessage ? (
                        <p className="text-red">{errorMessage}</p>
                    ) : null}
                    <p className="text-blue font-medium text-center text-sm">
                        Please reach out to our admin if you would like to
                        <br />
                        create an account or reset your password.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
