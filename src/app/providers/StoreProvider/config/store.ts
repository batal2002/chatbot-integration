import { configureStore } from '@reduxjs/toolkit';
import { rtkApi } from '@/shared/api/rtkApi';
import { appReducer } from '@/app/model/slice/appSlice';
import { noAuthApi } from '@/shared/api/noAuthApi';

export const store = configureStore({
    devTools: __IS_DEV__,
    reducer: {
        app: appReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
        [noAuthApi.reducerPath]: noAuthApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(rtkApi.middleware)
            .concat(noAuthApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
