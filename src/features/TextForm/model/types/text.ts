import { InferType } from 'yup';
import { textSchema } from '../../lib/validationSchema/textSchema';

export interface TextFormProps {
    className?: string;
    formId?: string;
}

export type TextFormData = InferType<typeof textSchema>;
