import classNames from 'classnames';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Controller,
    SubmitHandler,
    useFieldArray,
    useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import s from './CreateAssistantForm.module.scss';
import { FilesFormData, FilesFormProps } from '../model/types/files';
import { filesSchema } from '../lib/validationSchema/filesSchema';
import { Section } from '@/shared/ui/Section/Section';
import { FileUpload } from '@/shared/ui/FileUpload/FileUpload';
import { knowledgeBaseFiles } from '@/shared/const/acceptFileTypes';
import { KnowledgeBaseList } from '@/widgets/KnowledgeBaseList';
import { KnowledgeBaseItem } from '@/entities/KnowledgeBaseItem';
import { useCreateAssistantMutation } from '@/entities/Assistant';
import { KnowledgeBaseBlock } from '@/widgets/KnowledgeBaseBlock';

export const CreateAssistantForm: FC<FilesFormProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [trigger, { data, isLoading, isSuccess }] =
        useCreateAssistantMutation();
    const {
        control,
        handleSubmit,
        formState: { errors },
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
        trigger(formData);
    };

    useEffect(() => {
        if (isSuccess) {
            navigate(`/chatbot/${data.id}`);
        }
    }, [data, isSuccess, navigate]);

    return (
        <>
            <form
                id="create"
                className={classNames(s.CreateAssistantForm, {}, [className])}
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
                </Section>
            </form>
            <KnowledgeBaseBlock
                isCreate
                isPosting={isLoading}
                formId="create"
            />
        </>
    );
};
