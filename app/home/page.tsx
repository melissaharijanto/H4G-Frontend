'use client';

import { useAppSelector, useAppStore } from '@/lib/hooks';
import PageWithNavbar from '../components/PageWithNavbar';
import Category from '../components/CategoryLabel';
import ProductCard from '../components/ProductCard';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { API_URL } from '../constants';
import { setUser } from '@/lib/features/userSlice';
import { User } from '@/lib/types/User';

const Home = () => {
    const userInState = useAppSelector((state) => state.user);
    const session = useAppSelector((state) => state.session);
    const store = useAppStore();
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUserInPage] = useState<User>();

    const dummyCategories = [
        'Shoes',
        'Food and Drinks',
        'Bags',
        'Clothes',
        'Others',
    ];

    const dummyProducts = [
        'NIKE shoes 1',
        'NIKE shoes 2',
        'NIKE shoes 3',
        'NIKE shoes 4',
        'Adidas sneakers 1',
        'Adidas sneakers 2',
        'Puma shoes 1',
        'Puma shoes 2',
        'Reebok running shoes 1',
        'Reebok running shoes 2',
    ];

    const getUser = () => {
        const uid = jwtDecode(session.jwt).sub;
        fetch(`${API_URL}/users/${uid}`, {
            headers: {
                Authorization: `Bearer ${session.jwt}`,
            },
            method: 'GET',
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                const loadedUser: User = {
                    uid: data.user.uid,
                    name: data.user.name,
                    cat: data.user.cat,
                    email: data.user.email,
                    credit: data.user.credit,
                    is_active: true,
                    transactions: data.transactions,
                    tasks: data.tasks,
                };
                store.dispatch(setUser(loadedUser));
                setUserInPage(loadedUser);
            });
    };
    useEffect(() => {
        if (userInState.uid.trim().length == 0) {
            getUser();
        } else {
            setUserInPage(userInState);
        }
        setLoading(false);
    });
    if (!loading) {
        return (
            <PageWithNavbar>
                <div className="w-full p-8 font-inter flex flex-col gap-y-8">
                    <div className="w-full flex justify-between items-center">
                        <p className="text-red font-semibold text-3xl">
                            Welcome back, {user?.name}!
                        </p>
                        <p className="text-blue font-semibold">
                            You currently have{' '}
                            <span className="font-black">{user?.credit}</span>{' '}
                            {user?.credit == 1 ? 'credit' : 'credits'}.
                        </p>
                    </div>
                    <div className="w-full bg-gradient-to-b from-dark-green to-green rounded-xl p-5 flex flex-col gap-y-4">
                        <p className="text-white font-bold text-3xl">
                            Pick a Category
                        </p>
                        <div className="flex gap-x-4">
                            {dummyCategories.map((cat) => {
                                return <Category name={cat} key={cat} />;
                            })}
                        </div>
                    </div>
                    {/*Category*/}
                    <div className="flex flex-col gap-y-4">
                        <p className="font-bold text-blue text-3xl">Shoes</p>
                        <div className="w-full grid grid-cols-6 gap-x-4">
                            {dummyProducts.slice(0, 6).map((prod) => (
                                <ProductCard key={prod} />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-4">
                        <p className="font-bold text-blue text-3xl">
                            Food and Drinks
                        </p>
                        <div className="w-full grid grid-cols-6 gap-x-4">
                            {dummyProducts.slice(0, 6).map((prod) => (
                                <ProductCard key={prod} />
                            ))}
                        </div>
                    </div>
                </div>
            </PageWithNavbar>
        );
    } else {
        return null;
    }
};

export default Home;
