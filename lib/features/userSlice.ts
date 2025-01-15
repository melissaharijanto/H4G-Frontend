import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState : User = {
    user: {
        uid: '',
        name: '',
        cat: '',
        email: '',
        credit: 0.0,
        is_active: true,
    },
    transactions: [],
    tasks: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            const user_data = action.payload;
            state.user = {
                uid: user_data.user.uid ?? state.user.uid,
                name: user_data.user.name ?? state.user.name,
                cat: user_data.user.cat ?? state.user.cat,
                email: user_data.user.email ?? state.user.email,
                credit: user_data.user.credit ?? state.user.credit,
                is_active: user_data.user.is_active ?? state.user.is_active,
            };
            state.transactions = user_data.transactions ?? state.transactions;
            state.tasks = user_data.tasks ?? state.tasks;
        },
        clearUser(state) {
            state.user = {
                uid: '',
                name: '',
                cat: 'USER',
                email: '',
                credit: 0.0,
                is_active: false,
            };
            state.transactions = [];
            state.tasks = [];
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
