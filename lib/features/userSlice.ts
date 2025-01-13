import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    uid: '',
    name: 'Jimmy',
    cat: '',
    email: '',
    password: '',
    credit: 0.0
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
            if (user_data.password !== undefined) state.password = user_data.password;
            if (user_data.credit !== undefined) state.credit = user_data.credit;
        },
        clearUser(state) {
            state.uid = '';
            state.name = '';
            state.cat = 'USER';
            state.email = '';
            state.password = '';
            state.credit = 0.0;
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
