import { InferType } from 'yup';
import { generalSchema } from '@/features/GeneralForm/lib/validationSchema/generalSchema';
import { Assistant } from '@/entities/Assistant';

export interface GeneralFormProps {
    className?: string;
    assistantData?: Assistant;
}

export type GeneralFormData = InferType<typeof generalSchema>;
