import { rtkApi } from '@/shared/api/rtkApi';
import { Assistant } from '@/entities/Assistant';
import { PatchAssistantQuery } from '@/entities/Assistant/model/types/assistant';

const assistantApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getAssistantsData: build.query<Assistant[], void>({
            query: () => `/apps`,
            providesTags: ['Assistants'],
        }),
        createAssistant: build.mutation<Assistant, FormData>({
            query: (data) => ({
                url: '/apps/v2',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Assistants'],
        }),
        deleteAssistant: build.mutation<void, string | undefined>({
            query: (id) => ({
                url: `apps/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Assistants'],
        }),
        getAssistantData: build.query<Assistant, string | undefined>({
            query: (id) => `/apps/${id}`,
            providesTags: ['Assistant'],
        }),
        patchAssistant: build.mutation<void, PatchAssistantQuery>({
            query: ({ id, data }) => ({
                url: `apps/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Assistant'],
        }),
    }),
});

export const {
    useGetAssistantsDataQuery,
    useCreateAssistantMutation,
    useDeleteAssistantMutation,
    usePatchAssistantMutation,
    useGetAssistantDataQuery,
    useLazyGetAssistantDataQuery,
} = assistantApi;
