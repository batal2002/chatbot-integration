import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import s from './KeyList.module.scss';

interface KnowledgeBaseListProps {
    className?: string;
    children?: ReactNode;
}

export const KeyList: FC<KnowledgeBaseListProps> = (props) => {
    const { className, children } = props;

    const { t } = useTranslation();

    return (
        <>
            <h4 className={s.title}>{t('Ключи')}</h4>
            <ul className={classNames(s.KeyList, {}, [className])}>
                {children || (
                    <span>
                        {t(
                            'На данный момент у вас нет ключей API, но вы можете добавить их в любой момент',
                        )}
                    </span>
                )}
            </ul>
        </>
    );
};
