import { rtkApi } from '@/shared/api/rtkApi';
import { PatchPromptArgs } from '@/entities/Prompt/model/types/prompt';

const promptApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        patchPrompt: build.mutation<void, PatchPromptArgs>({
            query: ({ id, data }) => ({
                url: `/prompts/${id}`,
                method: 'PATCH',
                body: data,
            }),
        }),
    }),
});

export const { usePatchPromptMutation } = promptApi;
