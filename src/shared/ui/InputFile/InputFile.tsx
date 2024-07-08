import classNames from 'classnames';
import { FC, HTMLProps, useId } from 'react';
import { useTranslation } from 'react-i18next';
import s from './InputFile.module.scss';
import { OverflowText } from '@/shared/ui/OverflowText/OverflowText';

interface InputProps extends HTMLProps<HTMLInputElement> {
    className?: string;
    label?: string;
    error?: string;
}

export const InputFile: FC<InputProps> = (props) => {
    const { t } = useTranslation();
    const { className, label, error, value = '', onChange } = props;
    const id = useId();

    const mods = {
        [s.error]: !!error,
    };

    return (
        <div className={classNames(s.Input, mods, [className])}>
            {label && (
                <label className={s.label} htmlFor={id}>
                    {label}
                </label>
            )}
            <label htmlFor={id} className={s.customInput}>
                <span className={s.placeholder}>{t('Выбрать файл')}</span>
                <div className={s.filenameWrapper}>
                    <OverflowText>
                        {(value as string) || t('Файл не выбран')}
                    </OverflowText>
                </div>
            </label>
            <input
                className={s.input}
                type="file"
                accept={'image/*'}
                id={id}
                onChange={onChange}
            />
        </div>
    );
};
