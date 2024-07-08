import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from '@/shared/ui/Modal/Modal';
import s from './ChangeEmailModal.module.scss';
import { Button } from '@/shared/ui/Button/Button';

import { InputPassword } from '@/shared/ui/InputPassword/InputPassword';
import {
    ChangeEmailFormData,
    ChangeEmailModalProps,
} from '@/features/ChangeEmail/model/types/email';
import { emailSchema } from '@/features/ChangeEmail/lib/validationSchema/emailSchema';
import { Input } from '@/shared/ui/Input/Input';
import Alert from '@/shared/assets/icons/alert.svg';

export const ChangeEmailModal: FC<ChangeEmailModalProps> = (props) => {
    const { open, onClose } = props;
    const { t } = useTranslation();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        watch,
    } = useForm<ChangeEmailFormData>({
        resolver: yupResolver(emailSchema),
        defaultValues: {
            newEmail: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<ChangeEmailFormData> = (data) => {
        console.log(data);
    };

    const disabledButton =
        watch('newEmail').length !== 0 && watch('password').length !== 0;

    return (
        <Modal onClose={onClose} open={open} title={t('Изменить почту')}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={s.alert}>
                    <div className={s.iconWrapper}>
                        <Alert className={s.alertIcon} />
                    </div>
                    <span className={s.alertMessage}>
                        {t(
                            'После отправки формы мы отправим подтверждение на ваш новый адрес электронной почты. Вы должны открыть это письмо и подтвердить изменения',
                        )}
                    </span>
                </div>
                <Controller
                    name="newEmail"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Input
                            width="auto"
                            label={t('Новая почта')}
                            labelSize="s"
                            value={value}
                            onChange={onChange}
                            placeholder={t('Введите почту')}
                            error={errors.newEmail?.message}
                            errorMessage={errors.newEmail?.message}
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <InputPassword
                            width="auto"
                            label={t('Пароль')}
                            labelSize="s"
                            value={value}
                            onChange={onChange}
                            placeholder={t('Введите пароль от аккаунта')}
                            error={errors.password?.message}
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
