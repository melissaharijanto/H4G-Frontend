'use client';
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const session = useAppSelector((state) => state.session);

    if (session.jwt.length == 0 || !session.jwt) {
        redirect('/');
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
