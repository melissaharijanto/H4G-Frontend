import { createSlice } from '@reduxjs/toolkit';
import { SessionInfo } from '../types/SessionInfo';

const initialState : SessionInfo = {
    jwt: ''
};

const sessionSlice = createSlice({
    name: 'jwt',
    initialState: initialState,
    reducers: {
        setJwt(state, action) {
            const data = action.payload;
            if (data.jwt !== undefined) state.jwt = data.jwt;
        },
        clearJwt(state) {
            state.jwt = "";
        }
    }
});

export const { setJwt, clearJwt } = sessionSlice.actions;
export default sessionSlice.reducer;
