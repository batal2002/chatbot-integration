import { InferType } from 'yup';
import { recoverySchema } from '../../lib/validationSchema/recoverySchema';

export interface RecoveryFormProps {
    className?: string;
}

export type RecoveryFormData = InferType<typeof recoverySchema>;
