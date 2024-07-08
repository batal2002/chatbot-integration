import { InferType } from 'yup';
import { keySchema } from '../../lib/validationSchema/keySchema';

export interface AddKeyModalProps {
    className?: string;
    onClose: () => void;
    open: boolean;
}

export type AddKeyFormData = InferType<typeof keySchema>;
