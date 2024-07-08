import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { Modal } from '@/shared/ui/Modal/Modal';
import s from './ChangePassword.module.scss';
import { Button } from '@/shared/ui/Button/Button';
import {
    ChangePasswordFormData,
    ChangePasswordModalProps,
} from '@/features/ChangePassword/model/types/password';
import { passwordSchema } from '@/features/ChangePassword/lib/validationSchema/passwordSchema';

import { InputPassword } from '@/shared/ui/InputPassword/InputPassword';

export const ChangePasswordModal: FC<ChangePasswordModalProps> = (props) => {
    const { open, onClose } = props;
    const { t } = useTranslation();

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<ChangePasswordFormData>({
        resolver: yupResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    const onSubmit: SubmitHandler<ChangePasswordFormData> = (data) => {
        console.log(data);
    };

    const disabledButton =
        watch('currentPassword').length !== 0 &&
        watch('newPassword').length !== 0 &&
        watch('confirmPassword').length !== 0;

    return (
        <Modal onClose={onClose} open={open} title={t('Изменить пароль')}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="currentPassword"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <InputPassword
                            width="auto"
                            label={t('Текущий пароль')}
                            labelSize="s"
                            value={value}
                            onChange={onChange}
                            placeholder={t('Текущий пароль')}
                            error={errors.currentPassword?.message}
                        />
                    )}
                />
                <div>
                    <Controller
                        name="newPassword"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <InputPassword
                                width="auto"
                                label={t('Новый пароль')}
                                labelSize="s"
                                value={value}
                                onChange={onChange}
                                placeholder={t('Новый пароль')}
                                error={errors.newPassword?.message}
                            />
                        )}
                    />
                    <span
                        className={classNames(s.description, {
                            [s.error]: errors.newPassword,
                        })}
                    >
                        {t(
                            'Пароль должен содержать минимум 8 символов с прописными и заглавными буквами, цифрой или специальным знаком',
                        )}
                    </span>
                </div>
                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <InputPassword
                            width="auto"
                            label={t('Повторите пароль')}
                            labelSize="s"
                            value={value}
                            onChange={onChange}
                            placeholder={t('Подтвердите новый пароль')}
                            error={errors.confirmPassword?.message}
                            errorMessage={
                                errors.confirmPassword?.message
                                    ? t('Пароли не совпадают')
                                    : ''
                            }
                        />
                    )}
                />
                <div className={s.actions}>
                    <Button
                        onClick={onClose}
                        variant="outline"
                        color="dark"
                        size="s"
                    >
                        {t('Отменить')}
                    </Button>
                    <Button
                        disabled={!disabledButton}
                        type="submit"
                        variant="outline"
                        size="s"
                    >
                        {t('Подтвердить')}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
