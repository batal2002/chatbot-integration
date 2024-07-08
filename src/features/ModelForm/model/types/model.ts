import { InferType } from 'yup';
import { modelSchema } from '@/features/ModelForm/lib/validationSchema/modelSchema';

export interface ModelFormProps {
    className?: string;
}

export type ModelFormData = InferType<typeof modelSchema>;
