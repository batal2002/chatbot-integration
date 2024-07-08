import { InferType } from 'yup';
import { passwordSchema } from '../../lib/validationSchema/passwordSchema';

export interface ChangePasswordModalProps {
    className?: string;
    onClose: () => void;
    open: boolean;
}

export type ChangePasswordFormData = InferType<typeof passwordSchema>;
