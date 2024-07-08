import { object, string } from 'yup';

export const websitesSchema = object({
    input: string().required(),
});
