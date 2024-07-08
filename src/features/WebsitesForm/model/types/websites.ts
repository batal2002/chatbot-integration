import { InferType } from 'yup';
import { websitesSchema } from '../../lib/validationSchema/websitesSchema';

export interface WebsitesFormProps {
    className?: string;
}

export type WebsitesFormData = InferType<typeof websitesSchema>;
