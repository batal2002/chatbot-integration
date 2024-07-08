import classNames from 'classnames';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import s from './LoginForm.module.scss';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';

import { InputPassword } from '@/shared/ui/InputPassword/InputPassword';
import {
    LoginFormData,
    LoginFormProps,
} from '@/features/LoginForm/model/types/login';
import { loginSchema } from '@/features/LoginForm/lib/validationSchema/loginSchema';
import { useLoginMutation } from '@/features/LoginForm/api/loginApi';
import { FormError } from '@/shared/ui/FormError/FormError';
import { setIsAuth } from '@/app/model/slice/appSlice';
import { useAppDispatch } from '@/shared/lib/hooks/redux';

export const LoginForm: FC<LoginFormProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation();
    const [onLogin, { isLoading, error }] = useLoginMutation();
    const dispatch = useAppDispatch();
    const [cookies, setCookie] = useCookies();
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
        trigger,
    } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<LoginFormData> = (data) =>
        onLogin(data).then((data) => {
            if ('data' in data) {
                setCookie('access', data.data.access);
                setCookie('refresh', data.data.refresh);
                dispatch(setIsAuth(true));
            }
        });

    useEffect(() => {
        if (error) {
            if ('data' in error && error.data.non_field_errors) {
                setError('root.form', {
                    message: error.data.non_field_errors[0],
                });
            }
        }
    }, [error, setError]);

    return (
        <div className={classNames(s.LoginForm, {}, [className])}>
            <form
                className={classNames(s.form, {}, [className])}
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2 className={s.title}>{t('Войти в аккаунт')}</h2>

                <div className={s.inputs}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <Input
                                value={value}
                                onChange={onChange}
                                name="email"
                                placeholder={t('Ваш email')}
                                error={errors.email?.message}
                                errorMessage={errors.email?.message}
                                onBlur={() => trigger('email')}
                            />
                        )}
                    />

                    <Controller
                        name="password"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <InputPassword
                                value={value}
                                onChange={onChange}
                                placeholder={t('Пароль')}
                                error={errors.password?.message}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />
                    {errors.root?.form && (
                        <FormError error={errors.root?.form?.message} />
                    )}
                </div>

                <div className={s.submitWrapper}>
                    <Button
                        className={s.button}
                        type="submit"
                        buttonWidth="auto"
                        disabled={isLoading}
                    >
                        {t('Войти')}
                    </Button>
                    <Link to="/recovery" className={s.link}>
                        {t('Забыли пароль?')}
                    </Link>
                </div>
            </form>
            {/* TODO: Google */}
            {/* <GoogleSignIn */}
            {/*     label={t('Зарегистрироваться с помощью')} */}
            {/*     disabled={isLoading} */}
            {/* /> */}
        </div>
    );
};
