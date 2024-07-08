import { number, object, string } from 'yup';

export const generalSchema = object({
    name: string().required(),
    description: string(),
    confidence_threshold: number().required(),
    welcomeMessage: string().trim(),
    displayName: string().trim().required(),
});
