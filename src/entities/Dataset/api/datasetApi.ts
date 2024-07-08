import { rtkApi } from '@/shared/api/rtkApi';
import {
    DeleteFileArgs,
    PatchDataset,
    PostFileArgs,
} from '@/entities/Dataset/model/types/dataset';

const datasetApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        deleteDatasetFile: build.mutation<void, DeleteFileArgs>({
            query: ({ id, attachmentId }) => ({
                url: `/datasets/${id}/files/${attachmentId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Assistant'],
        }),
        postDatasetFile: build.mutation<void, PostFileArgs>({
            query: ({ id, data }) => ({
                url: `/datasets/${id}/files`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Assistant'],
        }),
        patchDataset: build.mutation<void, PatchDataset>({
            query: ({ id, data }) => ({
                url: `/datasets/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Assistant'],
        }),
    }),
});

export const {
    useDeleteDatasetFileMutation,
    usePostDatasetFileMutation,
    usePatchDatasetMutation,
} = datasetApi;
