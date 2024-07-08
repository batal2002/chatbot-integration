import classNames from 'classnames';
import { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import s from './TextForm.module.scss';

import { Section } from '@/shared/ui/Section/Section';
import { KnowledgeBaseList } from '@/widgets/KnowledgeBaseList';
import { KnowledgeBaseItem } from '@/entities/KnowledgeBaseItem';
import { textSchema } from '@/features/TextForm/lib/validationSchema/textSchema';
import {
    TextFormData,
    TextFormProps,
} from '@/features/TextForm/model/types/text';
import { Textarea } from '@/shared/ui/Textarea/Textarea';

export const TextForm: FC<TextFormProps> = (props) => {
    const { className, formId } = props;
    const { t } = useTranslation();
    const formRef = useRef(null);
    const [textList, setTextList] = useState<string[]>([]);
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TextFormData>({
        resolver: yupResolver(textSchema),
        defaultValues: {
            textResources: '',
        },
    });

    const onSubmit: SubmitHandler<TextFormData> = (data) => {
        if (!textList.includes(data.textResources)) {
            setTextList((prevState) => [...prevState, data.textResources]);
        }
        reset();
    };

    const removeText = (link: string) => {
        setTextList((prevState) => prevState.filter((item) => item !== link));
    };

    return (
        <div className={classNames(s.TextForm, {}, [className])}>
            <Section className={s.section}>
                <form
                    id={formId}
                    className={classNames(s.form, {}, [className])}
                    onSubmit={handleSubmit(onSubmit)}
                    ref={formRef}
                >
                    <Controller
                        name="textResources"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <Textarea
                                counter
                                formRef={formRef}
                                value={value}
                                onChange={onChange}
                                label={t('Текстовые ресурсы')}
                                resize
                                error={errors.textResources?.message}
                            />
                        )}
                    />
                </form>
                {textList.length > 0 && (
                    <KnowledgeBaseList
                        title={t('Включенные в обучение текстовые ресурсы')}
                    >
                        {textList.map((text) => (
                            <KnowledgeBaseItem
                                counter={text.length}
                                key={text}
                                name={text}
                                onClick={() => removeText(text)}
                            />
                        ))}
                    </KnowledgeBaseList>
                )}
            </Section>
        </div>
    );
};
