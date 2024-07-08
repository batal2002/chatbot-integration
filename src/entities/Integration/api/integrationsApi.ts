import { rtkApi } from '@/shared/api/rtkApi';
import {
    Integration,
    PatchIntegration,
    PostIntegration,
    UserIntegration,
} from '@/entities/Integration/model/types/integration';

const integrationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getIntegrationsData: build.query<Integration[], void>({
            query: () => `/integrations`,
        }),
        getUserIntegrationsData: build.query<UserIntegration[], void>({
            query: () => `/user-integrations`,
            providesTags: ['UserIntegrations'],
        }),
        createUserIntegration: build.mutation<void, PostIntegration>({
            query: (data) => ({
                url: '/user-integrations',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['UserIntegrations'],
        }),
        patchUserIntegration: build.mutation<void, PatchIntegration>({
            query: ({ id, data }) => ({
                url: `/user-integrations/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['UserIntegrations'],
        }),
        deleteUserIntegration: build.mutation<void, number>({
            query: (id) => ({
                url: `/user-integrations/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['UserIntegrations'],
        }),
    }),
});

export const {
    useGetIntegrationsDataQuery,
    useGetUserIntegrationsDataQuery,
    useCreateUserIntegrationMutation,
    usePatchUserIntegrationMutation,
    useDeleteUserIntegrationMutation,
} = integrationsApi;
