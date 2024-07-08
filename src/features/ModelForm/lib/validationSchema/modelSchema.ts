import { number, object, string } from 'yup';

export const modelSchema = object({
    instructions: string().required(),
    version: object({
        id: number().required(),
        name: string().required(),
    }),
    creativity: number().required(),
    max_tokens: number().required(),
});
