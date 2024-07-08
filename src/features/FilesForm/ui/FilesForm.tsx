import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Controller,
    SubmitHandler,
    useFieldArray,
    useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import { Simulate } from 'react-dom/test-utils';
import s from './FilesForm.module.scss';
import { FilesFormData, FilesFormProps } from '../model/types/files';
import { filesSchema } from '../lib/validationSchema/filesSchema';
import { Section } from '@/shared/ui/Section/Section';
import { FileUpload } from '@/shared/ui/FileUpload/FileUpload';
import { knowledgeBaseFiles } from '@/shared/const/acceptFileTypes';
import { KnowledgeBaseList } from '@/widgets/KnowledgeBaseList';
import { KnowledgeBaseItem } from '@/entities/KnowledgeBaseItem';
import { useGetAssistantDataQuery } from '@/entities/Assistant';
import {
    useDeleteDatasetFileMutation,
    usePostDatasetFileMutation,
} from '@/entities/Dataset';
import { KnowledgeBaseBlock } from '@/widgets/KnowledgeBaseBlock';
import reset = Simulate.reset;
import { useLazyGetAssistantDataQuery } from '@/entities/Assistant/api/assistantApi';

export const FilesForm: FC<FilesFormProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation();
    const { chatbotId } = useParams();
    const { data: assistantData, isLoading } =
        useGetAssistantDataQuery(chatbotId);
    const [triggerGetAssistant, { data }] = useLazyGetAssistantDataQuery();
    const [
        triggerDeleteFile,
        { isLoading: isLoadingDeleteFile, originalArgs, status },
    ] = useDeleteDatasetFileMutation();

    const [
        triggerPostFile,
        { isLoading: isLoadingPostFile, isSuccess: isSuccessPostFile, isError: isErrorPostFile },
    ] = usePostDatasetFileMutation();
    const [filesIsLoading, setFilesIsLoading] = useState<File[] | null>(null);
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FilesFormData>({
        resolver: yupResolver(filesSchema),
        defaultValues: {
            files: [],
        },
    });
    const { fields, append, remove } = useFieldArray({
        name: 'files',
        control,
    });

    const onSubmit: SubmitHandler<FilesFormData> = (data) => {
        const formData = new FormData();
        data.files.forEach((item) => formData.append('files', item.file));
        reset();
        setFilesIsLoading(data.files);
        triggerPostFile({
            id: assistantData?.model.dataset.id,
            data: formData,
        });
    };

    const onDelete = (attachmentId: number) => {
        if (assistantData)
            triggerDeleteFile({
                id: assistantData.model.dataset.id,
                attachmentId,
            });
    };

    useEffect(() => {
        if (isSuccessPostFile) setFilesIsLoading(null);
    }, [isSuccessPostFile, reset]);

    useEffect(() => {
        if (isErrorPostFile) setFilesIsLoading(null);
    }, [isErrorPostFile, reset]);

    return (
        <>
            <form
                id="dataset"
                className={classNames(s.FilesForm, {}, [className])}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Section className={s.section}>
                    <Controller
                        name="files"
                        control={control}
                        render={({ field: { value } }) => (
                            <FileUpload
                                filesType={knowledgeBaseFiles}
                                files={value}
                                append={append}
                                label={t('Загрузка файлов')}
                                error={errors.files?.message}
                            />
                        )}
                    />
                    {fields.length > 0 && (
                        <KnowledgeBaseList title={t('Прикрепленные файлы')}>
                            {fields.map((file, index) => (
                                <KnowledgeBaseItem
                                    key={file.name}
                                    name={file.name}
                                    onClick={() => remove(index)}
                                />
                            ))}
                        </KnowledgeBaseList>
                    )}

                    {((assistantData &&
                        assistantData.model.dataset.attachments.length > 0) ||
                        filesIsLoading) && (
                        <KnowledgeBaseList title={t('Включенные файлы')}>
                            {filesIsLoading &&
                                filesIsLoading.map((file) => (
                                    <KnowledgeBaseItem
                                        status="inProgress"
                                        key={file.name}
                                        name={file.name}
                                    />
                                ))}
                            {assistantData &&
                                assistantData.model.dataset.attachments.map(
                                    ({ id, name, file }) => (
                                        <KnowledgeBaseItem
                                            status="active"
                                            // isDeleting={
                                            //     originalArgs?.attachmentId ===
                                            //         id && status === 'pending'
                                            // }
                                            key={id}
                                            name={name}
                                            link={file}
                                            onClick={() => onDelete(id)}
                                        />
                                    ),
                                )}
                        </KnowledgeBaseList>
                    )}
                </Section>
            </form>

            <KnowledgeBaseBlock
                // isPosting={isLoadingPostFile}
                formId="dataset"
            />
        </>
    );
};
