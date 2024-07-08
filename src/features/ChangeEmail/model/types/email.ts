import { InferType } from 'yup';
import { emailSchema } from '../../lib/validationSchema/emailSchema';

export interface ChangeEmailModalProps {
    className?: string;
    onClose: () => void;
    open: boolean;
}

export type ChangeEmailFormData = InferType<typeof emailSchema>;
