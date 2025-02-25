import { Item } from '@/lib/types/Item';
import ProductCard from '../components/ProductCard';
import ProtectedRoute from '../components/ProtectedRoute';
import PageWithNavbar from '../components/PageWithNavbar';
import { useAppSelector, useAppStore } from '@/lib/hooks';
import { useEffect, useState } from 'react';
import { getUser } from '@/lib/backend/users';
import { setUser } from '@/lib/features/userSlice';
import { getAllItems } from '@/lib/backend/items';
import { jwtDecode } from 'jwt-decode';
import { User } from '@/lib/types/User';
import { useQuery } from '@tanstack/react-query';

const UserHome = () => {
    const userInState = useAppSelector((state) => state.user);
    const session = useAppSelector((state) => state.session);
    const store = useAppStore();
    const [user, setUserInPage] = useState<User>();
    // const [items, setItems] = useState<Item[]>([]);

    const { data, isLoading, error } = useQuery({
        queryKey: ['items'],
        queryFn: () => getAllItems(session.jwt),
    });

    const items = data?.items || [];

    useEffect(() => {
        if (userInState.user.uid.trim().length == 0) {
            const uid = jwtDecode(session.jwt).sub;
            getUser(session.jwt, uid!).then((data) => {
                store.dispatch(setUser(data));
                setUserInPage(data);
            });
        } else {
            setUserInPage(userInState);
        }

        // getAllItems(session.jwt).then((data) => {
        //     setItems(data.items);
        // });
    }, []);
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <div className="w-full p-8 font-inter flex flex-col gap-y-8">
                    <div className="w-full flex justify-between items-center">
                        <p className="text-red font-semibold text-3xl">
                            Welcome back, {user?.user.name}!
                        </p>
                        <p className="text-blue font-semibold">
                            You currently have{' '}
                            <span className="font-black">
                                {user?.user.credit}
                            </span>{' '}
                            {user?.user.credit == 1 ? 'credit' : 'credits'}.
                        </p>
                    </div>
                    <div className="w-full bg-gradient-to-b from-dark-green to-green rounded-xl p-5 flex flex-col gap-y-4">
                        <p className="text-white font-bold text-3xl">
                            New Products
                        </p>
                        {/* <div className="flex gap-x-4">
                        {dummyCategories.map((cat) => {
                            return <Category name={cat} key={cat} />;
                        })}
                    </div> */}
                    </div>
                    {/*Category*/}
                    <div className="flex flex-col gap-y-4">
                        <p className="font-bold text-blue text-3xl">Shoes</p>
                        <div className="w-full flex justify-between gap-x-4">
                            {items.slice(0, 6).map((prod: Item) => (
                                <ProductCard key={prod.id} item={prod} />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-4">
                        <p className="font-bold text-blue text-3xl">
                            {'<500'} credits
                        </p>
                        <div className="w-full flex justify-between gap-x-4">
                            {items
                                .filter((item) => Number(item.price) < 500)
                                .map((prod) => (
                                    <ProductCard
                                        key={`${prod.id}2}`}
                                        item={prod}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </PageWithNavbar>
        </ProtectedRoute>
    );
};

export default UserHome;
