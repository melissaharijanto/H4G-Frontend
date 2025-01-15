import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState : User = {
    uid: '',
    name: 'Jimmy',
    cat: '',
    email: '',
    credit: 0.0,
    is_active: true
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            const user_data = action.payload;
            if (user_data.uid !== undefined) state.uid = user_data.uid;
            if (user_data.name !== undefined) state.name = user_data.name;
            if (user_data.cat !== undefined) state.cat = user_data.cat;
            if (user_data.email !== undefined) state.email = user_data.email;
            if (user_data.credit !== undefined) state.credit = user_data.credit;
            if (user_data.is_active !== undefined) state.is_active = user_data.is_active;
        },
        clearUser(state) {
            state.uid = '';
            state.name = '';
            state.cat = 'USER';
            state.email = '';
            state.credit = 0.0;
            state.is_active = false;
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
