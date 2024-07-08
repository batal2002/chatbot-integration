import { object, string } from 'yup';

export const keySchema = object({
    keyName: string().required(),
});
