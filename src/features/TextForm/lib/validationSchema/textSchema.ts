import { object, string } from 'yup';

export const textSchema = object({
    textResources: string().required(),
});
