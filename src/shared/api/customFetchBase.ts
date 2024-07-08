import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { Cookies } from 'react-cookie';
import { RefreshTokenSchema } from '@/shared/model/types/refreshTokenShema';
import { setIsAuth, setIsAuthLoading } from '@/app/model/slice/appSlice';

const mutex = new Mutex();
const cookies = new Cookies();

const baseQueryNoAuth = fetchBaseQuery({
    baseUrl: __API__,
});

const baseQuery = fetchBaseQuery({
    baseUrl: __API__,
    prepareHeaders: (headers) => {
        const token = cookies.get('access') || '';
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const customFetchBase: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
        api.dispatch(setIsAuthLoading(true));
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                const refreshResult = await baseQueryNoAuth(
                    {
                        url: '/auth/token/refresh/',
                        method: 'POST',
                        body: {
                            refresh: cookies.get('refresh'),
                        },
                    },
                    api,
                    extraOptions,
                );

                if (refreshResult.data) {
                    cookies.set(
                        'access',
                        (refreshResult.data as RefreshTokenSchema).access,
                    );
                    cookies.set(
                        'refresh',
                        (refreshResult.data as RefreshTokenSchema).refresh,
                    );
                    result = await baseQuery(args, api, extraOptions);
                    api.dispatch(setIsAuth(true));
                } else {
                    api.dispatch(setIsAuth(false));
                }
            } finally {
                // release must be called once the mutex should be released again.
                release();
                api.dispatch(setIsAuthLoading(false));
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }

    if (result.error?.status !== 401) {
        api.dispatch(setIsAuth(true));
        api.dispatch(setIsAuthLoading(false));
    }

    return result;
};

export default customFetchBase;
