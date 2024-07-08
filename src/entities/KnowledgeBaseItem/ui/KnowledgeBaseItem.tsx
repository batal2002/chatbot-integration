import classNames from 'classnames';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import s from './KnowledgeBaseItem.module.scss';
import { OverflowText } from '@/shared/ui/OverflowText/OverflowText';
import { IconButton } from '@/shared/ui/IconButton/IconButton';
import Delete from '@/shared/assets/icons/delete.svg';
import { getNoun } from '@/shared/lib/utils/getNoun';

type Status = 'active' | 'inProgress';

interface KnowledgeBaseItemProps {
    className?: string;
    name: string;
    onClick?: () => void;
    counter?: number;
    link?: string;
    status?: Status;
    isDeleting?: boolean;
}

export const KnowledgeBaseItem: FC<KnowledgeBaseItemProps> = (props) => {
    const { className, name, onClick, counter, link, status, isDeleting } =
        props;
    const { t } = useTranslation();

    const statusLabel = useMemo(
        () => ({
            active: t('Обученный'),
            inProgress: t('Обучается'),
        }),
        [t],
    );

    return (
        <li className={classNames(s.KnowledgeBaseItem, {}, [className])}>
            {status && (
                <span className={classNames(s.tag, {}, [s[status]])}>
                    {statusLabel[status]}
                </span>
            )}
            <a
                href={link}
                className={s.filename}
                target="_blank"
                rel="noopener noreferrer"
            >
                <OverflowText>{name}</OverflowText>
                {counter && (
                    <span className={s.count}>
                        ({counter}{' '}
                        {getNoun(
                            counter,
                            t('символ'),
                            t('символа'),
                            t('символов'),
                        )}
                        )
                    </span>
                )}
            </a>

            {onClick && (
                <IconButton
                    icon={<Delete />}
                    onClick={onClick}
                    className={s.button}
                    isLoading={isDeleting}
                />
            )}
        </li>
    );
};
