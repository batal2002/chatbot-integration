export interface DeleteFileArgs {
    id?: number;
    attachmentId?: number;
}
export interface PostFileArgs {
    id?: number;
    data?: FormData;
}
export interface PatchDataset {
    id?: number;
    data?: {
        name?: string;
        creativity?: number;
        delimiter?: string;
    };
}
