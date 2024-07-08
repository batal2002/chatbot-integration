import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { ApiErrorResponse } from '@/shared/model/types/error';

export const noAuthApi = createApi({
    reducerPath: 'noAuthApi',
    baseQuery: fetchBaseQuery({
        baseUrl: __API__,
    }) as BaseQueryFn<string | FetchArgs, unknown, ApiErrorResponse>,
    endpoints: (builder) => ({}),
});
