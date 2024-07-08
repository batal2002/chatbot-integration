import { InferType } from 'yup';
import { registrationSchema } from '../../lib/validationSchema/registrationSchema';

export interface RegistrationFormProps {
    className?: string;
}

export type RegistrationFormData = InferType<typeof registrationSchema>;
