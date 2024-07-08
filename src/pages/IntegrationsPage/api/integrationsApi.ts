import { rtkApi } from '@/shared/api/rtkApi';

const integrationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getIntegrationsData: build.query<any, void>({
            query: () => `/integrations`,
        }),
        getUserIntegrationsData: build.query<any, void>({
            query: () => `/user-integrations`,
        }),
    }),
});

export const { useGetIntegrationsDataQuery, useGetUserIntegrationsDataQuery } =
    integrationsApi;
