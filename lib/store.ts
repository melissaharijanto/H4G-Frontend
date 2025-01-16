import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from '../lib/features/userSlice.ts'
import sessionReducer from '../lib/features/sessionSlice.ts'
// import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { persistStore } from 'redux-persist';
import storage from './storage.ts';

const persistConfig = {
  key: 'persist-mwh',
  storage
}

const rootReducers = combineReducers({
  user: userReducer,
  session: sessionReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
}

export const persistor = (store: ReturnType<typeof makeStore>) => persistStore(store);
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
