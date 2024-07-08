import classNames from 'classnames';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import s from './ChangePasswordForm.module.scss';
import { Button } from '@/shared/ui/Button/Button';

import { InputPassword } from '@/shared/ui/InputPassword/InputPassword';
import {
    ChangePasswordFormData,
    ChangePasswordFormProps,
} from '@/features/ChangePasswordForm/model/types/changePassword';
import { changePasswordSchema } from '@/features/ChangePasswordForm/lib/validationSchema/changePasswordSchema';
import { useChangePasswordMutation } from '@/features/ChangePasswordForm/api/changePasswordApi';
import { FormError } from '@/shared/ui/FormError/FormError';

export const ChangePasswordForm: FC<ChangePasswordFormProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [
        triggerChange,
        {
            isSuccess: isSuccessChange,
            isLoading: isLoadingChange,
            error: errorChange,
        },
    ] = useChangePasswordMutation();
    const [searchParams] = useSearchParams();
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<ChangePasswordFormData>({
        resolver: yupResolver(changePasswordSchema),
        defaultValues: {
            new_password: '',
            confirm_new_password: '',
        },
    });
    const uid = searchParams.get('uid');
    const token = searchParams.get('token');

    const onSubmit: SubmitHandler<ChangePasswordFormData> = (data) => {
        if (uid && token) {
            triggerChange({
                uid,
                token,
                ...data,
            });
        }
    };

    console.log(errorChange);
    useEffect(() => {
        if (errorChange) {
            if ('status' in errorChange && errorChange.status === 400) {
                setError('root.form', { message: t('Данные устарели.') });
            }
        }
    }, [errorChange, setError, t]);

    if (isSuccessChange)
        return (
            <div className={classNames(s.successWrapper, {}, [className])}>
                <h3 className={s.title}>{t('Изменение пароля')}</h3>
                <span>{t(`Пароль успешно изменен`)}</span>
                <Link className={s.linkToLogin} to="/login">
                    {t('Вернуться на страницу входа')}
                </Link>
            </div>
        );

    return (
        <div className={classNames(s.ChangePasswordForm, {}, [className])}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <h2 className={s.title}>{t('Изменить пароль')}</h2>

                <div className={s.inputs}>
                    <div>
                        <Controller
                            name="new_password"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <InputPassword
                                    value={value}
                                    onChange={onChange}
                                    placeholder={t('Пароль')}
                                    error={errors.new_password?.message}
                                />
                            )}
                        />
                        <span
                            className={classNames(s.passwordRules, {
                                [s.error]: errors.new_password,
                            })}
                        >
                            {t(
                                'Пароль должен содержать минимум 8 символов с прописными и заглавными буквами, цифрой или специальным знаком',
                            )}
                        </span>
                    </div>

                    <Controller
                        name="confirm_new_password"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <InputPassword
                                value={value}
                                onChange={onChange}
                                placeholder={t('Повторить пароль')}
                                error={errors.confirm_new_password?.message}
                                errorMessage={
                                    errors.confirm_new_password?.message
                                }
                            />
                        )}
                    />
                </div>

                <div className={s.submitWrapper}>
                    <Button
                        className={s.button}
                        type="submit"
                        buttonWidth="auto"
                        disabled={isLoadingChange}
                    >
                        {t('Сохранить')}
                    </Button>
                </div>
                {errors.root?.form && (
                    <div className={s.errorWrapper}>
                        <FormError error={errors.root?.form?.message} />
                        <div className={s.linkWrapper}>
                            <span>{t('Перейти на страницу')}</span>
                            <Link to="/recovery" className={s.link}>
                                {t(' восстановления пароля')}
                            </Link>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};
