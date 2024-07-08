import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from '@/shared/ui/Modal/Modal';
import s from './ChangeNameModal.module.scss';
import { Button } from '@/shared/ui/Button/Button';

import { Input } from '@/shared/ui/Input/Input';
import {
    ChangeNameFormData,
    ChangeNameModalProps,
} from '@/features/ChangeName/model/types/email';
import { nameSchema } from '@/features/ChangeName/lib/validationSchema/nameSchema';
import { useGetUserDataQuery, usePatchUserDataMutation } from '@/entities/User';

export const ChangeNameModal: FC<ChangeNameModalProps> = (props) => {
    const { open, onClose } = props;
    const { t } = useTranslation();
    const { data, isFetching } = useGetUserDataQuery();
    const [trigger, { isSuccess, isLoading }] = usePatchUserDataMutation();
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        watch,
    } = useForm<ChangeNameFormData>({
        resolver: yupResolver(nameSchema),
        defaultValues: {
            first_name: data?.first_name,
            last_name: data?.last_name,
        },
    });

    const onSubmit: SubmitHandler<ChangeNameFormData> = (data) => {
        trigger(data);
    };

    const disabledButton = watch('first_name').length !== 0;

    useEffect(() => {
        if (isSuccess) onClose();
    }, [isSuccess, onClose]);

    return (
        <Modal onClose={onClose} open={open} title={t('Редактировать имя')}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="first_name"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Input
                            label={t('Имя')}
                            width="auto"
                            labelSize="s"
                            value={value}
                            onChange={onChange}
                            placeholder={t('Введите имя')}
                            error={errors.first_name?.message}
                        />
                    )}
                />
                <Controller
                    name="last_name"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Input
                            label={t('Фамилия')}
                            width="auto"
                            labelSize="s"
                            value={value}
                            onChange={onChange}
                            placeholder={t('Введите фамилию')}
                            error={errors.last_name?.message}
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
                        disabled={!disabledButton || isLoading}
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
