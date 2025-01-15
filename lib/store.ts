import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../lib/features/userSlice.ts'
import sessionReducer from '../lib/features/sessionSlice.ts'

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      session: sessionReducer,
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
