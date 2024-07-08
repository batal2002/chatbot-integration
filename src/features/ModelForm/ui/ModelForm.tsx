import classNames from 'classnames';
import { FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { unstable_usePrompt, useParams } from 'react-router-dom';
import s from './ModelForm.module.scss';
import { Section } from '@/shared/ui/Section/Section';
import { Button } from '@/shared/ui/Button/Button';
import { Textarea } from '@/shared/ui/Textarea/Textarea';
import { Select } from '@/shared/ui/Select2/Select';
import { InputRange } from '@/shared/ui/InputRange/InputRange';
import {
    ModelFormData,
    ModelFormProps,
} from '@/features/ModelForm/model/types/model';
import { modelSchema } from '@/features/ModelForm/lib/validationSchema/modelSchema';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';
import {
    useGetAllAiModelsDataQuery,
    usePatchModelMutation,
} from '@/entities/Model';
import {
    useGetAssistantDataQuery,
    usePatchAssistantMutation,
} from '@/entities/Assistant';
import { PageLoader } from '@/widgets/PageLoader';
import { usePatchPromptMutation } from '@/entities/Prompt';
import { usePatchDatasetMutation } from '@/entities/Dataset';

export const ModelForm: FC<ModelFormProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation();
    const { isMobile } = useScreenDetector();
    const formRef = useRef(null);
    const { chatbotId } = useParams();

    const { data: aiModels } = useGetAllAiModelsDataQuery();
    const [triggerPrompt, { isLoading: isLoadingPrompt }] =
        usePatchPromptMutation();
    const [triggerModel, { isLoading: isLoadingModel }] =
        usePatchModelMutation();
    const [triggerDataset, { isLoading: isLoadingDataset }] =
        usePatchDatasetMutation();
    const [triggerAssistant, { isLoading: isLoadingAssistant }] =
        usePatchAssistantMutation();
    const { data: assistantData, isLoading } =
        useGetAssistantDataQuery(chatbotId);

    const {
        control,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
    } = useForm<ModelFormData>({
        resolver: yupResolver(modelSchema),
        defaultValues: {
            instructions: '',
            creativity: 0,
            max_tokens: 0,
        },
    });

    unstable_usePrompt({
        message: t(
            'Вы уверены что хотите покинуть страницу?\nВсе не сохраненные изменения пропадут.',
        ),
        when: () => isDirty,
    });

    const onSubmit: SubmitHandler<ModelFormData> = (data) => {
        if (assistantData) {
            triggerAssistant({
                id: chatbotId,
                data: {
                    max_tokens: data.max_tokens,
                },
            });
            triggerPrompt({
                id: assistantData.model.prompt.id,
                data: {
                    description: data.instructions,
                },
            });
            triggerModel({
                id: assistantData.model.id,
                data: {
                    ai_model_id: data.version.id,
                },
            });
            triggerDataset({
                id: assistantData.model.dataset.id,
                data: {
                    creativity: data.creativity,
                },
            });
        }
    };

    useEffect(() => {
        if (assistantData) {
            reset({
                version: assistantData.model.ai_model,
                instructions: assistantData.model.prompt.description || '',
                creativity: assistantData.model.dataset.creativity || 0,
                max_tokens: assistantData.max_tokens || 0,
            });
        }
    }, [reset, assistantData]);

    if (isLoading) return <PageLoader size="child" />;

    return (
        <form
            ref={formRef}
            className={classNames(s.ModelForm, {}, [className])}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Section>
                <Controller
                    name="instructions"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Textarea
                            label={t('Инструкции')}
                            value={value}
                            onChange={onChange}
                            error={errors.instructions?.message}
                            formRef={formRef}
                            resize
                        />
                    )}
                />

                <span className={s.info}>
                    {t(
                        'Инструкции позволят вам настроить личность и стиль вашего чатбота. Пожалуйста, экспериментируйте с инструкциями, делая их максимально приближенными к вашим данным и условиям использования.',
                    )}
                </span>
            </Section>
            <Section>
                <Controller
                    name="version"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Select
                            data={aiModels}
                            selectValue={value}
                            placeholder={t('Не выбрана')}
                            onChange={onChange}
                            label={t('Версия модели')}
                            error={errors.version?.id?.message}
                        />
                    )}
                />
            </Section>

            <Section>
                <Controller
                    name="creativity"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <InputRange
                            label={t('Креативность')}
                            value={value}
                            onChange={onChange}
                            isPercent
                            minLabel={t('Сдержанный')}
                            maxLabel={t('Креативный')}
                            tooltipText={t(
                                'Определяет, насколько креативны или шаблонны будут ответы чатбота',
                            )}
                        />
                    )}
                />
            </Section>
            <Section>
                <Controller
                    name="max_tokens"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <InputRange
                            label={t('Токены')}
                            value={value}
                            onChange={onChange}
                            max={100000}
                            tooltipText={t(
                                'Максимальное количество текенов, которые могут использоваться',
                            )}
                        />
                    )}
                />
            </Section>

            <Button
                className={s.button}
                type="submit"
                size={isMobile ? 's' : 'm'}
                disabled={
                    isLoadingModel ||
                    isLoadingPrompt ||
                    isLoadingDataset ||
                    isLoadingAssistant
                }
            >
                {t('Сохранить')}
            </Button>
        </form>
    );
};
