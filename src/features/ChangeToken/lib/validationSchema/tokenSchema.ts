import { object, string } from 'yup';

export const tokenSchema = object({
    token: string(),
});
