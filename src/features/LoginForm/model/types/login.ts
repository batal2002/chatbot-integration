import { InferType } from 'yup';
import { loginSchema } from '../../lib/validationSchema/loginSchema';

export interface LoginFormProps {
    className?: string;
}

export type LoginFormData = InferType<typeof loginSchema>;
