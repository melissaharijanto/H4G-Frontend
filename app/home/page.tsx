'use client';

import { useAppSelector } from '@/lib/hooks';
import PageWithNavbar from '../components/PageWithNavbar';
import Category from '../components/CategoryLabel';

const Home = () => {
    const user = useAppSelector((state) => state.user);
    const dummyCategories = [
        'Shoes',
        'Food and Drinks',
        'Bags',
        'Clothes',
        'Others',
    ];
    return (
        <PageWithNavbar>
            <div className="w-full p-8 font-inter flex flex-col gap-y-8">
                <div className="w-full flex justify-between items-center">
                    <p className="text-red font-semibold text-3xl">
                        Welcome back, {user.name}!
                    </p>
                    <p className="text-blue font-semibold">
                        You currently have{' '}
                        <span className="font-black">{user.credit}</span>{' '}
                        {user.credit == 1 ? 'credit' : 'credits'}.
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
            </div>
        </PageWithNavbar>
    );
};

export default Home;
