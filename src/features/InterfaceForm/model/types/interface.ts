import { InferType } from 'yup';
import { interfaceSchema } from '@/features/InterfaceForm/lib/validationSchema/interfaceSchema';

export interface InterfaceFormProps {
    className?: string;
}

export type InterfaceFormData = InferType<typeof interfaceSchema>;
