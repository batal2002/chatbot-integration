import { array, object } from 'yup';
import { FileData } from '@/shared/model/types/file';

export const filesSchema = object({
    files: array<FileData[]>().required(),
});
