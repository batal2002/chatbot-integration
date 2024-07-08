import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import { Modal } from '@/shared/ui/Modal/Modal';
import s from './ChangeTokenModal.module.scss';
import { Button } from '@/shared/ui/Button/Button';

import { Input } from '@/shared/ui/Input/Input';
import {
    ChangeTokenFormData,
    ChangeTokenModalProps,
} from '@/features/ChangeToken/model/types/token';
import { tokenSchema } from '@/features/ChangeToken/lib/validationSchema/tokenSchema';
import { CopyText } from '@/features/CopyText';
import {
    useCreateUserIntegrationMutation,
    useDeleteUserIntegrationMutation,
    usePatchUserIntegrationMutation,
} from '@/entities/Integration';
import { useGetAssistantDataQuery } from '@/entities/Assistant';
import { DeleteIntegrationModal } from '@/features/DeleteIntegration';

export const ChangeTokenModal: FC<ChangeTokenModalProps> = (props) => {
    const { open, onClose, data: integrationData, isActiveIntegration } = props;
    const { t } = useTranslation();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const { chatbotId } = useParams();
    const { data: assistantData } = useGetAssistantDataQuery(chatbotId);
    // const { data: userData, isFetching } = useGetUserDataQuery();

    const [
        triggerPost,
        {
            isSuccess: isSuccessPost,
            isLoading: isLoadingPost,
            error: errorPost,
        },
    ] = useCreateUserIntegrationMutation();
    const [
        triggerPatch,
        {
            isSuccess: isSuccessPatch,
            isLoading: isLoadingPatch,
            error: errorPatch,
        },
    ] = usePatchUserIntegrationMutation();
    const [
        triggerDelete,
        { isSuccess: isSuccessDelete, isLoading: isLoadingDelete },
    ] = useDeleteUserIntegrationMutation();

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setError,
    } = useForm<ChangeTokenFormData>({
        resolver: yupResolver(tokenSchema),
        defaultValues: {
            token: isActiveIntegration?.settings?.token || '',
        },
    });

    const onSubmit: SubmitHandler<ChangeTokenFormData> = (data) => {
        if (assistantData) {
            if (isActiveIntegration) {
                if (data.token) {
                    triggerPatch({
                        id: isActiveIntegration.id,
                        data: {
                            integration_id: integrationData.id,
                            model_id: assistantData.model.id,
                            name: `${assistantData.name} ${integrationData.name}`,
                            settings: {
                                token: data.token,
                            },
                        },
                    });
                } else {
                    setOpenDeleteModal(true);
                }
            } else if (data.token)
                triggerPost({
                    integration_id: integrationData.id,
                    model_id: assistantData.model.id,
                    name: `${assistantData.name} ${integrationData.name}`,
                    settings: {
                        token: data.token,
                    },
                });
        }
    };

    useEffect(() => {
        if (errorPatch) {
            if (
                'originalStatus' in errorPatch &&
                errorPatch.originalStatus === 500
            ) {
                setError('token', { message: t('Токен не действителен') });
            }
        }
    }, [errorPatch, setError, t]);

    useEffect(() => {
        if (errorPost) {
            if (
                'originalStatus' in errorPost &&
                errorPost.originalStatus === 500
            ) {
                setError('token', { message: t('Токен не действителен') });
            }
        }
    }, [errorPost, setError, t]);

    useEffect(() => {
        if (isSuccessPost || isSuccessPatch || isSuccessDelete) onClose();
    }, [isSuccessDelete, isSuccessPatch, isSuccessPost, onClose]);

    return (
        <>
            <Modal
                onClose={onClose}
                open={open}
                title={t(`Управление интеграцией с ${integrationData.slug}`)}
            >
                <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={s.wrapper}>
                        <Controller
                            name="token"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    label={t('Токен')}
                                    width="auto"
                                    labelSize="s"
                                    value={value}
                                    onChange={onChange}
                                    error={errors.token?.message}
                                    errorMessage={errors.token?.message}
                                />
                            )}
                        />
                        <CopyText
                            text={watch('token')}
                            onlyButton
                            className={s.copy}
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
                        <Button
                            type="submit"
                            variant="outline"
                            size="s"
                            disabled={
                                isLoadingPost ||
                                isLoadingPatch ||
                                isLoadingDelete
                            }
                        >
                            {t('Сохранить')}
                        </Button>
                    </div>
                </form>
            </Modal>
            {openDeleteModal && isActiveIntegration && (
                <DeleteIntegrationModal
                    open={openDeleteModal}
                    onClose={() => setOpenDeleteModal(false)}
                    name={isActiveIntegration?.integration.slug}
                    onDelete={() => triggerDelete(isActiveIntegration.id)}
                    isDeleting={isLoadingDelete}
                />
            )}
        </>
    );
};
