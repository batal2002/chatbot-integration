import { object, string } from 'yup';

export const nameSchema = object({
    first_name: string().required(''),
    last_name: string(),
});
