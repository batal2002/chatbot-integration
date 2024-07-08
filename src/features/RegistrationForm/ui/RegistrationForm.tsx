import classNames from 'classnames';
import { FC, useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import s from './RegistrationForm.module.scss';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import {
    RegistrationFormData,
    RegistrationFormProps,
} from '@/features/RegistrationForm/model/types/registration';
import { registrationSchema } from '@/features/RegistrationForm/lib/validationSchema/registrationSchema';
import { InputPassword } from '@/shared/ui/InputPassword/InputPassword';
import { useRegistrationMutation } from '@/features/RegistrationForm/api/registrationApi';

export const RegistrationForm: FC<RegistrationFormProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation();
    const [onRegistration, { isLoading, isSuccess, error }] =
        useRegistrationMutation();

    const {
        control,
        handleSubmit,
        setError,
        trigger,
        formState: { errors },
    } = useForm<RegistrationFormData>({
        resolver: yupResolver(registrationSchema),
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirm_password: '',
        },
    });

    const onSubmit: SubmitHandler<RegistrationFormData> = (data) =>
        onRegistration(data);

    useEffect(() => {
        if (error) {
            if ('data' in error) {
                if (error.data.email) {
                    setError('email', {
                        message: error.data.email[0],
                    });
                }
            }
        }
    }, [error, setError, t]);

    if (isSuccess)
        return (
            <div className={classNames(s.successWrapper, {}, [className])}>
                <h3 className={s.title}>{t('Подтвердите ваш email')}</h3>
                <span>
                    {t(
                        'Мы отправили вам письмо с подтверждением. Пожалуйста, проверьте свой почтовый ящик и подтвердите адрес электронной почты',
                    )}
                </span>
                <Link className={s.linkToLogin} to="/login">
                    {t('Перейти на страницу входа')}
                </Link>
            </div>
        );

    return (
        <div className={classNames(s.RegistrationForm, {}, [className])}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <h2 className={s.title}>{t('Зарегистрироваться')}</h2>

                <div className={s.inputs}>
                    <Controller
                        name="first_name"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <Input
                                placeholder={t('Имя')}
                                value={value}
                                onChange={onChange}
                                error={errors.first_name?.message}
                            />
                        )}
                    />
                    <Controller
                        name="last_name"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <Input
                                placeholder={t('Фамилия')}
                                value={value}
                                onChange={onChange}
                                error={errors.last_name?.message}
                            />
                        )}
                    />
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
                            />
                        )}
                    />

                    <div>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <InputPassword
                                    value={value}
                                    onChange={onChange}
                                    placeholder={t('Пароль')}
                                    error={errors.password?.message}
                                />
                            )}
                        />
                        <span
                            className={classNames(s.passwordRules, {
                                [s.error]: errors.password,
                            })}
                        >
                            {t(
                                'Пароль должен содержать минимум 8 символов с прописными и заглавными буквами, цифрой или специальным знаком',
                            )}
                        </span>
                    </div>

                    <Controller
                        name="confirm_password"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <InputPassword
                                value={value}
                                onChange={onChange}
                                placeholder={t('Повторить пароль')}
                                error={errors.confirm_password?.message}
                                errorMessage={errors.confirm_password?.message}
                            />
                        )}
                    />
                </div>

                <div className={s.submitWrapper}>
                    <Button
                        className={s.button}
                        type="submit"
                        buttonWidth="auto"
                        disabled={isLoading}
                    >
                        {t('Создать аккаунт')}
                    </Button>
                    <span className={s.agree}>
                        <Trans i18nKey="user_agree">
                            Нажимая кнопку «Создать аккаунт», вы соглашаетесь с{' '}
                            {/* TODO: rules */}
                            {/* <Link to="/" className={s.link}> */}
                            {/*     правилами */}
                            {/* </Link>{' '} */}
                            правилами и {/* <Link to="/" className={s.link}> */}
                            {/*     офертой */}
                            {/* </Link>{' '} */}
                            офертой RunBotAi
                        </Trans>
                    </span>
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
