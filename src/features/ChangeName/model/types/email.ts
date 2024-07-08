import { InferType } from 'yup';
import { nameSchema } from '../../lib/validationSchema/nameSchema';

export interface ChangeNameModalProps {
    className?: string;
    onClose: () => void;
    open: boolean;
}

export type ChangeNameFormData = InferType<typeof nameSchema>;
