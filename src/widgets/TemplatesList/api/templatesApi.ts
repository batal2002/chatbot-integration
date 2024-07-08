import { rtkApi } from '@/shared/api/rtkApi';

const templatesApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getTemplates: build.query<any, void>({
            query: () => `/prompt-templates`,
        }),
    }),
});

export const { useGetTemplatesQuery } = templatesApi;
