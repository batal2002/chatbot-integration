import { rtkApi } from '@/shared/api/rtkApi';
import { SelectData2 } from '@/shared/model/types/selectData';
import { PatchModelQuery } from '@/entities/Model/model/types/model';

const modelApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getAllAiModelsData: build.query<SelectData2[], void>({
            query: () => `/ai-models`,
        }),
        patchModel: build.mutation<void, PatchModelQuery>({
            query: ({ id, data }) => ({
                url: `/models/${id}`,
                method: 'PATCH',
                body: data,
            }),
        }),
    }),
});

export const { useGetAllAiModelsDataQuery, usePatchModelMutation } = modelApi;
