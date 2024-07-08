import { object, string } from 'yup';

export const changePasswordSchema = object({
    new_password: string()
        .required()
        .matches(
            /^(?=.*[0-9]|.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/,
        ),
    confirm_new_password: string()
        .required(' ')
        .test(function (value) {
            return this.parent.new_password !== value
                ? this.createError({
                      message: 'Пароли не совпадают',
                      path: 'confirm_new_password',
                  })
                : true;
        }),
});
