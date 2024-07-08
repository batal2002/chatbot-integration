import classNames from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { unstable_usePrompt, useParams } from 'react-router-dom';
import s from './GeneralForm.module.scss';
import { Section } from '@/shared/ui/Section/Section';
import { Button } from '@/shared/ui/Button/Button';
import { InputRange } from '@/shared/ui/InputRange/InputRange';
import {
    GeneralFormData,
    GeneralFormProps,
} from '@/features/GeneralForm/model/types/general';
import { generalSchema } from '@/features/GeneralForm/lib/validationSchema/generalSchema';
import { Input } from '@/shared/ui/Input/Input';
import { CopyText } from '@/features/CopyText';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';
import Play from '@/shared/assets/icons/play.svg';
import { useSwipe } from '@/shared/lib/hooks/useSwipe';
import { DeleteAssistantButton } from '@/features/DeleteAssistant';
import { usePatchAssistantMutation } from '@/entities/Assistant';
import { Textarea } from '@/shared/ui/Textarea/Textarea';
import { usePatchPromptMutation } from '@/entities/Prompt';

export const GeneralForm: FC<GeneralFormProps> = (props) => {
    const { className, assistantData } = props;
    const { t } = useTranslation();
    const { isMobile, isTablet } = useScreenDetector();
    const formRef = useRef(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [triggerAssistant, { isLoading: isLoadingAssistant }] =
        usePatchAssistantMutation();
    const [triggerPrompt, { isLoading: isLoadingPrompt }] =
        usePatchPromptMutation();
    const { chatbotId } = useParams();
    const {
        control,
        handleSubmit,
        formState: { errors, isDirty },
        resetField,
        watch,
        reset,
    } = useForm<GeneralFormData>({
        resolver: yupResolver(generalSchema),
        defaultValues: {
            name: '',
            description: '',
            confidence_threshold: 0,
            displayName: '',
            welcomeMessage: '',
        },
    });
    const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe({
        onSwipedRight: () => setOpenDialog(false),
        onSwipedLeft: () => setOpenDialog(true),
    });

    unstable_usePrompt({
        message: t(
            'Вы уверены что хотите покинуть страницу?\nВсе не сохраненные изменения пропадут.',
        ),
        when: () => isDirty,
    });

    const onSubmit: SubmitHandler<GeneralFormData> = (data) => {
        triggerAssistant({
            id: chatbotId,
            data: {
                name: data.name,
                description: data.description,
                confidence_threshold: data.confidence_threshold,
            },
        });
        if (assistantData) {
            triggerPrompt({
                id: assistantData?.model.prompt.id,
                data: {
                    header: data.welcomeMessage,
                    name: data.displayName,
                },
            });
        }
    };
    useEffect(() => {
        document.body.style.overflow = openDialog ? 'hidden' : 'auto';
    }, [openDialog]);

    useEffect(() => {
        if (assistantData) {
            reset({
                name: assistantData.name,
                description: assistantData.description || '',
                confidence_threshold: assistantData.confidence_threshold,
                displayName: assistantData.model.prompt.name,
                welcomeMessage: assistantData.model.prompt.header || '',
            });
        }
    }, [reset, assistantData]);

    return (
        <>
            <form
                className={classNames(s.ModelForm, {}, [className])}
                onSubmit={handleSubmit(onSubmit)}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                ref={formRef}
            >
                <Section>
                    <span className={s.copyLabel}>{t('ID чатбота')}</span>
                    <CopyText text={assistantData?.id.toString() || ''} />
                </Section>
                <Section className={s.section}>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <Input
                                label={t('Название чатбота')}
                                value={value}
                                onChange={onChange}
                                error={errors.name?.message}
                            />
                        )}
                    />
                    <Controller
                        name="description"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <Input
                                label={t('Описание чатбота')}
                                value={value}
                                onChange={onChange}
                                error={errors.description?.message}
                            />
                        )}
                    />
                    <Controller
                        name="welcomeMessage"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <Textarea
                                label={t('Приветственное сообщение')}
                                value={value}
                                onChange={onChange}
                                error={errors.welcomeMessage?.message}
                                tooltipText={t(
                                    'Вводите каждое сообщение с новой строки',
                                )}
                                tooltipPosition={isMobile ? 'left' : 'right'}
                                reset={
                                    !isMobile
                                        ? () => resetField('welcomeMessage')
                                        : undefined
                                }
                                formRef={formRef}
                            />
                        )}
                    />
                    <Controller
                        name="displayName"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <Input
                                label={t('Отображаемое имя')}
                                value={value}
                                onChange={onChange}
                                error={errors.displayName?.message}
                            />
                        )}
                    />
                </Section>

                <Section>
                    <Controller
                        name="confidence_threshold"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <InputRange
                                label={t('Пороговое значение уверенности')}
                                value={value}
                                onChange={onChange}
                                isPercent
                                tooltipText={t(
                                    'Если бот знает с уверенностью меньше порогового, то он не отвечает, а у менеджера во входящих этот чат подсвечивается как непрочитанный',
                                )}
                                tooltipPosition={isTablet ? 'left' : 'top'}
                            />
                        )}
                    />
                </Section>

                <Section>
                    <span className={s.buttonLabel}>{t('Удаление')}</span>
                    <DeleteAssistantButton />
                </Section>

                <div className={s.actions}>
                    {isTablet && (
                        <Button
                            variant="outline"
                            size={isMobile ? 's' : 'm'}
                            onClick={() => setOpenDialog(true)}
                        >
                            <Play className={s.buttonIcon} />
                            {t('Песочница')}
                        </Button>
                    )}
                    <Button
                        className={s.button}
                        type="submit"
                        size={isMobile ? 's' : 'm'}
                        disabled={isLoadingAssistant || isLoadingPrompt}
                    >
                        {t('Сохранить')}
                    </Button>
                </div>

                {/* TODO: Dialog */}
                {/* {isTablet && ( */}
                {/*     <RightSideModal */}
                {/*         onClose={() => setOpenDialog(false)} */}
                {/*         open={openDialog} */}
                {/*     > */}
                {/*         <ChatbotDialog */}
                {/*             formData={watch()} */}
                {/*             fullPage={isTablet} */}
                {/*             fullPageOnClose={() => setOpenDialog(false)} */}
                {/*         /> */}
                {/*     </RightSideModal> */}
                {/* )} */}
            </form>

            {/* {!isTablet && <ChatbotDialog formData={watch()} />} */}
        </>
    );
};
