'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore, persistor } from '../lib/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const storeRef = useRef<AppStore | null>(null);
    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    return (
        <Provider store={storeRef.current}>
            <PersistGate
                loading={
                    <div className="bg-off-white w-full min-h-screen"></div>
                }
                persistor={persistor(storeRef.current)}>
                {children}
            </PersistGate>
        </Provider>
    );
}
