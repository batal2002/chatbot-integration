import { object, string } from 'yup';

export const recoverySchema = object({
    email: string()
        .required(' ')
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Неверный формат почты',
        ),
});
