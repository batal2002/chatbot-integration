import { InferType } from 'yup';
import { filesSchema } from '../../lib/validationSchema/filesSchema';

export interface FilesFormProps {
    className?: string;
}

export type FilesFormData = InferType<typeof filesSchema>;
