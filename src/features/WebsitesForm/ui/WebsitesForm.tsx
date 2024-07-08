import classNames from 'classnames';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import s from './WebsitesForm.module.scss';
import { WebsitesFormData, WebsitesFormProps } from '../model/types/websites';
import { websitesSchema } from '../lib/validationSchema/websitesSchema';
import { Section } from '@/shared/ui/Section/Section';
import { KnowledgeBaseList } from '@/widgets/KnowledgeBaseList';
import { KnowledgeBaseItem } from '@/entities/KnowledgeBaseItem';
import { Input } from '@/shared/ui/Input/Input';
import { Button } from '@/shared/ui/Button/Button';

export const WebsitesForm: FC<WebsitesFormProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation();
    const [websitesList, setWebsitesList] = useState<string[]>([]);
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<WebsitesFormData>({
        resolver: yupResolver(websitesSchema),
        defaultValues: {
            input: '',
        },
    });

    const onSubmit: SubmitHandler<WebsitesFormData> = (data) => {
        if (!websitesList.includes(data.input)) {
            setWebsitesList((prevState) => [...prevState, data.input]);
        }
        reset();
    };

    const removeLink = (link: string) => {
        setWebsitesList((prevState) =>
            prevState.filter((item) => item !== link),
        );
    };

    return (
        <div className={classNames(s.WebsitesForm, {}, [className])}>
            <Section className={s.section}>
                <form
                    className={classNames(s.form, {}, [className])}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Controller
                        name="input"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <Input
                                value={value}
                                onChange={onChange}
                                label={t('Сайты')}
                                error={errors.input?.message}
                                placeholder="https://www.example.ru"
                            />
                        )}
                    />
                    <Button type="submit" size="s">
                        {t('Получить ссылки')}
                    </Button>
                </form>
                {websitesList.length > 0 && (
                    <KnowledgeBaseList title={t('Полученные  ссылки')}>
                        {websitesList.map((link, index) => (
                            <KnowledgeBaseItem
                                key={link}
                                name={link}
                                onClick={() => removeLink(link)}
                            />
                        ))}
                    </KnowledgeBaseList>
                )}
            </Section>
        </div>
    );
};
