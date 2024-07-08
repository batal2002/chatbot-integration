import { InferType } from 'yup';
import { changePasswordSchema } from '../../lib/validationSchema/changePasswordSchema';

export interface ChangePasswordFormProps {
    className?: string;
}

export type ChangePasswordFormData = InferType<typeof changePasswordSchema>;
