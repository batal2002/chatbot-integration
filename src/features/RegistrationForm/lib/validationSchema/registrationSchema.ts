import { object, string } from 'yup';

export const registrationSchema = object({
    first_name: string().required(),
    last_name: string().optional(),
    email: string()
        .required(' ')
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Неверный формат почты',
        ),
    password: string()
        .required()
        .matches(
            /^(?=.*[0-9]|.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/,
        ),
    confirm_password: string()
        .required(' ')
        .test(function (value) {
            return this.parent.password !== value
                ? this.createError({
                      message: 'Пароли не совпадают',
                      path: 'confirm_password',
                  })
                : true;
        }),
});
