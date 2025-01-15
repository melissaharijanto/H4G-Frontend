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
            if (user_data.user.uid !== undefined) state.user.uid = user_data.uid;
            if (user_data.user.name !== undefined) state.user.name = user_data.name;
            if (user_data.user.cat !== undefined) state.user.cat = user_data.cat;
            if (user_data.user.email !== undefined) state.user.email = user_data.email;
            if (user_data.user.credit !== undefined) state.user.credit = user_data.credit;
            if (user_data.user.is_active !== undefined) state.user.is_active = user_data.is_active;
            if (user_data.transactions !== undefined) state.transactions = user_data.transactions;
            if (user_data.tasks !== undefined) state.tasks = user_data.tasks
        },
        clearUser(state) {
            state.user.uid = '';
            state.user.name = '';
            state.user.cat = 'USER';
            state.user.email = '';
            state.user.credit = 0.0;
            state.user.is_active = false;
            state.transactions = [];
            state.tasks = [];
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
