import { object, string } from 'yup';

export const answerSchema = object({
    answer: string().required(),
});
