import classNames from 'classnames';
import { FC } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import s from './LogItem.module.scss';
import { logListItem } from '@/shared/model/types/logListItem';
import { OverflowText } from '@/shared/ui/OverflowText/OverflowText';

interface DialogItemProps extends logListItem {
    className?: string;
}

const diffTime = (date: Date) => {
    const date2 = new Date();
    const timeDiff = Math.abs(date2.getTime() - date.getTime());
    const diffSec = Math.floor(timeDiff / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return i18n.t('Сейчас');
    if (diffMin < 60) return `${diffMin} ${i18n.t('минут назад')}`;
    if (diffHour < 24) return `${diffHour} ${i18n.t('часов назад')}`;
    if (diffDay < 2) return i18n.t('Вчера');

    return date.toLocaleString('ru', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    });
};

export const LogItem: FC<DialogItemProps> = (props) => {
    const { className, id, clientMessage, botMessage, date } = props;
    const { chatbotId } = useParams();
    const { t } = useTranslation();

    return (
        <NavLink
            to={`/chatbot/${chatbotId}/dashboard/logs/${id}`}
            className={({ isActive }) =>
                classNames(s.DialogItem, { [s.active]: isActive }, [className])
            }
        >
            <div className={s.header}>
                <OverflowText
                    className={s.title}
                >{`${t('Клиент')}: ${clientMessage}`}</OverflowText>
                <span className={s.date}>{diffTime(date)}</span>
            </div>
            <OverflowText
                className={s.message}
            >{`${t('Бот')}: ${botMessage}`}</OverflowText>
        </NavLink>
    );
};
