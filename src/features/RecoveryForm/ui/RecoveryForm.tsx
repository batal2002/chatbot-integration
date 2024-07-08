import classNames from 'classnames';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import s from './RecoveryForm.module.scss';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';

import {
    RecoveryFormData,
    RecoveryFormProps,
} from '@/features/RecoveryForm/model/types/recovery';
import { recoverySchema } from '@/features/RecoveryForm/lib/validationSchema/recoverySchema';
import { useResetPasswordMutation } from '@/features/RecoveryForm/api/recoveryApi';
import { FormError } from '@/shared/ui/FormError/FormError';

export const RecoveryForm: FC<RecoveryFormProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation();
    const [onReset, { data, isLoading, isSuccess, error }] =
        useResetPasswordMutation();
    const {
        control,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm<RecoveryFormData>({
        resolver: yupResolver(recoverySchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit: SubmitHandler<RecoveryFormData> = (data) => onReset(data);
    console.log(error);
    useEffect(() => {
        if (error) {
            if ('data' in error) {
                if (error.data.email) {
                    setError('email', {
                        message: error.data.email[0],
                    });
                }
                if (error.data.detail) {
                    setError('root.form', {
                        message: error.data.detail as string,
                    });
                }
            }
        }
    }, [error, setError, t]);

    if (isSuccess)
        return (
            <div className={classNames(s.successWrapper, {}, [className])}>
                <h3 className={s.title}>{t('Восстановление пароля')}</h3>
                <span>
                    {t(
                        `Ссылка для подтверждения была отправлена на ${watch('email')}. Если она не появится в течение нескольких минут, проверьте папку со спамом`,
                    )}
                </span>
                <Link className={s.linkToLogin} to="/login">
                    {t('Вернуться на страницу входа')}
                </Link>
            </div>
        );

    return (
        <form
            className={classNames(s.RecoveryForm, {}, [className])}
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2 className={s.title}>{t('Восстановление пароля')}</h2>

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
                    {t('Отправить письмо')}
                </Button>
                <Link to="/login" className={s.link}>
                    {t('Вернуться на страницу входа')}
                </Link>
            </div>
            {errors.root?.form && (
                <FormError error={errors.root?.form?.message} />
            )}
        </form>
    );
};
