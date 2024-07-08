import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CopyText } from '@/features/CopyText';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Input } from '@/shared/ui/Input/Input';
import s from './AddKeyModal.module.scss';
import {
    AddKeyFormData,
    AddKeyModalProps,
} from '@/features/AddKey/model/types/key';
import { keySchema } from '@/features/AddKey/lib/validationSchema/keySchema';
import { Button } from '@/shared/ui/Button/Button';

export const AddKeyModal: FC<AddKeyModalProps> = (props) => {
    const { open, onClose } = props;
    const { t } = useTranslation();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<AddKeyFormData>({
        resolver: yupResolver(keySchema),
        defaultValues: {
            keyName: 'Primary key',
        },
    });

    const onSubmit: SubmitHandler<AddKeyFormData> = (data) => {
        console.log(data);
    };

    return (
        <Modal
            onClose={onClose}
            open={open}
            title={t('Добавление нового ключа')}
        >
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="keyName"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Input
                            label={t('Название')}
                            labelSize="s"
                            width="auto"
                            value={value}
                            onChange={onChange}
                            error={errors.keyName?.message}
                        />
                    )}
                />
                <div>
                    <h6 className={s.label}>{t('Токен')}</h6>
                    <CopyText
                        width="auto"
                        text="u4KolF0l9XTLC7Oyl1DR5u4KolF0l9XTLC7Oyl1DR5"
                        alertText={t('Токен скопирован')}
                    />
                </div>
                <div className={s.actions}>
                    <Button
                        onClick={onClose}
                        variant="outline"
                        color="dark"
                        size="s"
                    >
                        {t('Отменить')}
                    </Button>
                    <Button type="submit" variant="outline" size="s">
                        {t('Добавить')}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
