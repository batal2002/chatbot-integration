import classNames from 'classnames';
import { FC } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import s from './InboxItem.module.scss';
import { OverflowText } from '@/shared/ui/OverflowText/OverflowText';
import { inboxListItem } from '@/shared/model/types/inboxListItem';
import { Avatar } from '@/shared/ui/Avatar/Avatar';

interface DialogItemProps extends inboxListItem {
    className?: string;
}

export const InboxItem: FC<DialogItemProps> = (props) => {
    const { className, id, lastMessage, name } = props;
    const { chatbotId } = useParams();
    const { t } = useTranslation();

    return (
        <NavLink
            to={`/chatbot/${chatbotId}/dashboard/inbox/${id}`}
            className={({ isActive }) =>
                classNames(s.InboxItem, { [s.active]: isActive }, [className])
            }
        >
            <Avatar name="a" />
            <div>
                <div className={s.name}>{name}</div>
                <OverflowText className={s.message}>{lastMessage}</OverflowText>
            </div>
        </NavLink>
    );
};
