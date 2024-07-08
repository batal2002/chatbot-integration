import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from '@/shared/ui/Modal/Modal';
import s from './CheckAnswerModal.module.scss';
import { Button } from '@/shared/ui/Button/Button';

import { Input } from '@/shared/ui/Input/Input';
import {
    CheckAnswerFormData,
    CheckAnswerModalProps,
} from '@/features/CheckAnswer/model/types/answer';
import { answerSchema } from '@/features/CheckAnswer/lib/validationSchema/answerSchema';

export const CheckAnswerModal: FC<CheckAnswerModalProps> = (props) => {
    const { open, onClose } = props;
    const { t } = useTranslation();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<CheckAnswerFormData>({
        resolver: yupResolver(answerSchema),
        defaultValues: {
            answer: '',
        },
    });

    const onSubmit: SubmitHandler<CheckAnswerFormData> = (data) => {
        console.log(data);
    };

    return (
        <Modal onClose={onClose} open={open} title={t('Проверить ответ')}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={s.section}>
                    <h5 className={s.title}>{t('Запрос клиента')}</h5>
                    <span className={s.borderText}>
                        Какие материалы мне нужно изучить перед первым рабочим
                        днем?
                    </span>
                </div>
                <div className={s.section}>
                    <h5 className={s.title}>{t('Ответ бота')}</h5>
                    <span className={s.borderText}>
                        Перед твоим первым рабочим днем, рекомендую ознакомиться
                        с вводным курсом о компании, пройти тестирование по
                        корпоративной этике и ознакомиться с коллегами в
                        онлайн-пространстве. Курсы можно найти на нашем
                        корпоративном ресурсе Портал поддержки сотрудников
                    </span>
                </div>

                <Controller
                    name="answer"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Input
                            label={t('Ожидаемый ответ')}
                            labelSize="s"
                            value={value}
                            onChange={onChange}
                            placeholder={t('Введите новый ответ')}
                            error={errors.answer?.message}
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
                    <Button type="submit" variant="outline" size="s">
                        {t('Обновить ответ')}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
