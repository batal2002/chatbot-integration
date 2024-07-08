import classNames from 'classnames';
import { FC, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import s from './InterfaceForm.module.scss';
import { Section } from '@/shared/ui/Section/Section';
import { Button } from '@/shared/ui/Button/Button';
import { Textarea } from '@/shared/ui/Textarea/Textarea';

import {
    InterfaceFormData,
    InterfaceFormProps,
} from '@/features/InterfaceForm/model/types/interface';
import { interfaceSchema } from '@/features/InterfaceForm/lib/validationSchema/interfaceSchema';
import { Input } from '@/shared/ui/Input/Input';
import { Select } from '@/shared/ui/Select/Select';
import { SelectData } from '@/shared/model/types/selectData';
import { InputFile } from '@/shared/ui/InputFile/InputFile';
import { InputCheckbox } from '@/shared/ui/InputCheckbox/InputCheckbox';
import { ColorPicker } from '@/shared/ui/ColorPicker/ColorPicker';
import { ChatbotDialog } from '@/widgets/ChatbotDialog';
import { ChatbotButton } from '@/shared/ui/ChatbotButton/ChatbotButton';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';
import { useGetAssistantDataQuery } from '@/entities/Assistant';
import { usePatchPromptMutation } from '@/entities/Prompt';

export const InterfaceForm: FC<InterfaceFormProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation();
    const formRef = useRef(null);
    const { isTablet, isMobile } = useScreenDetector();
    const { chatbotId } = useParams();
    const { data: assistantData, isSuccess } =
        useGetAssistantDataQuery(chatbotId);

    const [triggerPrompt, { isLoading: isLoadingPrompt }] =
        usePatchPromptMutation();

    const selectThemeData = useMemo(
        (): SelectData[] => [
            {
                value: 'light',
                title: t('Светлая'),
            },
            {
                value: 'dark',
                title: t('Темная'),
            },
        ],
        [t],
    );
    const selectButtonPositionData = useMemo(
        (): SelectData[] => [
            {
                value: 'right',
                title: t('Справа'),
            },
            {
                value: 'left',
                title: t('Слево'),
            },
        ],
        [t],
    );
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        resetField,

        watch,
    } = useForm<InterfaceFormData>({
        resolver: yupResolver(interfaceSchema),
        defaultValues: {
            theme: selectThemeData[0],
            buttonPosition: selectButtonPositionData[0],
            withoutProfileImage: false,
            withoutChatbotIcon: false,
            welcomeMessage: '',
            suggestedPosts: '',
            placeholder: '',
            displayName: 'Travel chatbot',
            profileImage: undefined,
            messageColor: '#494BD9',
            chatbotIcon: undefined,
            buttonColor: '#494BD9',
        },
    });

    const onSubmit: SubmitHandler<InterfaceFormData> = (data) => {
        if (assistantData?.model.prompt.id) {
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
        if (isSuccess) {
            resetField('welcomeMessage', {
                defaultValue: assistantData?.model.prompt.header,
            });
            resetField('displayName', {
                defaultValue: assistantData?.model.prompt.name,
            });
        }
    }, [isSuccess, assistantData, resetField]);

    return (
        <div className={classNames(s.InterfaceForm, {}, [className])}>
            <div className={s.wrapper}>
                <form
                    ref={formRef}
                    id="InterfaceForm"
                    onSubmit={handleSubmit(onSubmit)}
                    className={s.form}
                >
                    <Section className={s.section}>
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
                                    tooltipPosition={
                                        isMobile ? 'left' : 'right'
                                    }
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
                            name="suggestedPosts"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Textarea
                                    label={t('Предлагаемые сообщения')}
                                    value={value}
                                    onChange={onChange}
                                    error={errors.suggestedPosts?.message}
                                    tooltipText={t(
                                        'Вводите каждое сообщение с новой строки',
                                    )}
                                    formRef={formRef}
                                />
                            )}
                        />
                        <Controller
                            name="placeholder"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    label={t('Плейсхолдер')}
                                    value={value}
                                    onChange={onChange}
                                    error={errors.placeholder?.message}
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

                    <Section className={s.section}>
                        <Controller
                            name="theme"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Select
                                    data={selectThemeData}
                                    selectValue={value}
                                    onChange={onChange}
                                    label={t('Тема')}
                                    error={errors.theme?.value?.message}
                                />
                            )}
                        />
                        <div className={s.fileWrapper}>
                            <Controller
                                name="profileImage"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <InputFile
                                        value={value?.name}
                                        onChange={(e) =>
                                            onChange(e.currentTarget.files?.[0])
                                        }
                                        label={t('Картинка профиля чатбота')}
                                        error={errors.profileImage?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="withoutProfileImage"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <InputCheckbox
                                        checked={value}
                                        onChange={onChange}
                                        label={t(
                                            'Не показывать картинку профиля',
                                        )}
                                        error={
                                            errors.withoutProfileImage?.message
                                        }
                                    />
                                )}
                            />
                        </div>
                        <Controller
                            name="messageColor"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <ColorPicker
                                    color={value}
                                    onChange={onChange}
                                    label={t('Цвет сообщения пользователя')}
                                    reset={
                                        !isMobile
                                            ? () => resetField('messageColor')
                                            : undefined
                                    }
                                />
                            )}
                        />
                    </Section>

                    <Section className={s.section}>
                        <Controller
                            name="buttonPosition"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Select
                                    data={selectButtonPositionData}
                                    selectValue={value}
                                    onChange={onChange}
                                    label={t(
                                        'Расположение плавающей кнопки чатбота',
                                    )}
                                    error={
                                        errors.buttonPosition?.value?.message
                                    }
                                />
                            )}
                        />
                        <div className={s.fileWrapper}>
                            <Controller
                                name="chatbotIcon"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <InputFile
                                        value={value?.name}
                                        onChange={(e) =>
                                            onChange(e.currentTarget.files?.[0])
                                        }
                                        label={t('Иконка чатбота')}
                                        error={errors.chatbotIcon?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="withoutChatbotIcon"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <InputCheckbox
                                        checked={value}
                                        onChange={onChange}
                                        label={t(
                                            'Не показывать плавающую кнопку чатбота',
                                        )}
                                        error={
                                            errors.withoutProfileImage?.message
                                        }
                                    />
                                )}
                            />
                        </div>
                        <Controller
                            name="buttonColor"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <ColorPicker
                                    color={value}
                                    onChange={onChange}
                                    label={t('Цвет плавающей кнопки чатбота')}
                                    reset={
                                        !isMobile
                                            ? () => resetField('buttonColor')
                                            : undefined
                                    }
                                />
                            )}
                        />
                    </Section>
                </form>
                {!isTablet && (
                    <div className={s.chatbotWrapper}>
                        <ChatbotDialog formData={watch()} />
                        {!watch('withoutChatbotIcon') && (
                            <ChatbotButton
                                chatbotIcon={watch('chatbotIcon')}
                                color={watch('buttonColor')}
                                style={
                                    watch('buttonPosition').value === 'right'
                                        ? {
                                              marginLeft: 'auto',
                                          }
                                        : {}
                                }
                            />
                        )}
                    </div>
                )}
            </div>

            <div className={s.actions}>
                <Button
                    className={s.button}
                    variant="outline"
                    onClick={() => reset()}
                    size={isMobile ? 's' : 'm'}
                >
                    {t('Сбросить все')}
                </Button>
                <Button
                    className={s.button}
                    type="submit"
                    form="InterfaceForm"
                    size={isMobile ? 's' : 'm'}
                    disabled={isLoadingPrompt}
                >
                    {t('Сохранить')}
                </Button>
            </div>
            {isTablet && (
                <div className={s.chatbotWrapper}>
                    <h5 className={s.title}>{t('Предпросмотр интерфейса')}</h5>
                    <ChatbotDialog formData={watch()} />
                    {!watch('withoutChatbotIcon') && (
                        <ChatbotButton
                            chatbotIcon={watch('chatbotIcon')}
                            color={watch('buttonColor')}
                            position={watch('buttonPosition').value}
                        />
                    )}
                </div>
            )}
        </div>
    );
};
