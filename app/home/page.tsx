'use client';

import { useAppSelector, useAppStore } from '@/lib/hooks';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { setUser } from '@/lib/features/userSlice';
import { User } from '@/lib/types/User';
import { Item } from '@/lib/types/Item';
import { getUser } from '@/lib/backend/users';
import { getAllItems } from '@/lib/backend/items';
import UserHome from './UserHome';
import AdminHome from './AdminHome';

const Home = () => {
    const userInState = useAppSelector((state) => state.user);
    const session = useAppSelector((state) => state.session);
    const store = useAppStore();
    const [user, setUserInPage] = useState<User>();
    const [items, setItems] = useState<Item[]>([]);

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

        getAllItems(session.jwt).then((data) => {
            setItems(data.items);
        });
    }, []);

    if (user?.user.cat === 'USER') {
        return <UserHome />;
    } else {
        return <AdminHome />;
    }
};

export default Home;
