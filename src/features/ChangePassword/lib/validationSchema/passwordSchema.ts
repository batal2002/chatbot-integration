import { object, string } from 'yup';

export const passwordSchema = object({
    currentPassword: string().required(),
    newPassword: string()
        .required()
        .matches(
            /^(?=.*[0-9]|.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/,
        ),
    confirmPassword: string()
        .required()
        .test(function (value) {
            return this.parent.newPassword === value;
        }),
});
