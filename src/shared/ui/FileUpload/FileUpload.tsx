import classNames from 'classnames';
import { ChangeEvent, DragEventHandler, FC, useId } from 'react';
import { useTranslation } from 'react-i18next';
import s from './FileUpload.module.scss';
import Upload from '@/shared/assets/icons/upload.svg';
import { FileData } from '@/shared/model/types/file';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';

interface InputProps {
    className?: string;
    label?: string;
    error?: string;
    files: FileData[];
    filesType: string[];
    append: (file: FileData) => void;
}

export const FileUpload: FC<InputProps> = (props) => {
    const { t } = useTranslation();
    const { className, label, error, files, filesType, append } = props;
    const id = useId();
    const { isTablet } = useScreenDetector();
    const mods = {
        [s.error]: !!error,
    };

    const filesTypeJoin = filesType.join(', ');

    const handleOnLoadFile = (fileList: FileList) => {
        Array.from(fileList).forEach((file) => {
            if (files?.some((item) => item.name === file.name)) return;
            if (
                !filesType.includes(
                    `.${file.name.split('.')[file.name.split('.').length - 1]}`,
                )
            ) {
                alert(`Не поддерживаемый формат файла "${file.name}"`);
                return;
            }

            append({ file, name: file.name });
        });
    };

    const handleDrop: DragEventHandler<HTMLLabelElement> = (e) => {
        e.preventDefault();
        const droppedFiles = e.dataTransfer?.files;
        if (droppedFiles && droppedFiles.length > 0) {
            handleOnLoadFile(droppedFiles);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputFiles = e.currentTarget?.files;
        if (inputFiles && inputFiles.length > 0) {
            handleOnLoadFile(inputFiles);
        }
    };

    return (
        <div className={classNames(s.Input, mods, [className])}>
            {label && (
                <label className={s.label} htmlFor={id}>
                    {label}
                </label>
            )}
            <label
                htmlFor={id}
                className={s.dropzone}
                onDrop={handleDrop}
                onDragOver={(event) => event.preventDefault()}
            >
                <div className={s.wrapper}>
                    <Upload className={s.icon} />
                    <span className={s.info}>
                        {isTablet
                            ? t('Нажмите, чтобы выбрать файлы')
                            : t(
                                  'Перетащите сюда файлы или нажмите, чтобы выбрать их',
                              )}
                    </span>
                    <span className={s.types}>
                        {t('Поддерживаемые типы файлов')}: {filesTypeJoin}
                    </span>
                </div>
            </label>
            <input
                className={s.input}
                type="file"
                accept={filesTypeJoin}
                multiple
                id={id}
                onChange={handleChange}
            />
        </div>
    );
};
