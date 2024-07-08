import classNames from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import Copy from 'shared/assets/icons/copy.svg';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@/shared/ui/IconButton/IconButton';
import s from './CopyText.module.scss';
import { OverflowText } from '@/shared/ui/OverflowText/OverflowText';

type Variant = 'outline' | 'clear';
type Width = 'fit' | 'auto';

interface CopyTextProps {
    className?: string;
    text?: string;
    variant?: Variant;
    alertText?: string;
    width?: Width;
    onlyButton?: boolean;
}

export const CopyText: FC<CopyTextProps> = (props) => {
    const {
        className,
        text,
        variant = 'clear',
        alertText,
        width = 'fit',
        onlyButton = false,
    } = props;
    const { t } = useTranslation();
    const [copy, setCopy] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    const onCopy = () => {
        if (text) {
            navigator.clipboard.writeText(text).then(() => {
                setCopy(true);
            });
        }
    };

    useEffect(() => {
        if (copy) {
            timerRef.current = setTimeout(() => {
                setCopy(false);
            }, 1000);
        }

        return () => {
            clearTimeout(timerRef.current);
        };
    }, [copy]);

    return (
        <div
            className={classNames(s.CopyText, {}, [
                className,
                s[variant],
                s[width],
            ])}
        >
            {!onlyButton && text && (
                <OverflowText className={s.text}>{text}</OverflowText>
            )}
            {copy && (
                <span className={s.tag}>{alertText || t('Скопировано')}</span>
            )}
            <IconButton
                icon={<Copy />}
                onClick={onCopy}
                className={s.button}
                iconColor="dark"
            />
        </div>
    );
};
