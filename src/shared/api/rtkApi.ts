import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from '@/shared/api/customFetchBase';

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: customFetchBase,
    tagTypes: [
        'User',
        'Assistants',
        'Assistant',
        'DatasetFiles',
        'UserIntegrations',
    ],
    endpoints: (builder) => ({}),
});
