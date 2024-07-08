import { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import s from './InboxPage.module.scss';
import { InboxItem } from '@/entities/InboxItem';
import { inboxListItem } from '@/shared/model/types/inboxListItem';
import { InboxWindow } from '@/widgets/InboxWindow';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';
import { RightSideModal } from '@/shared/ui/RightSideModal/RightSideModal';
import { InboxHeader } from '@/widgets/InboxHeader';

const dialogList: inboxListItem[] = [
    {
        id: 0,
        lastMessage:
            'Какие материалы мне нужно изучить перед первым рабочим днем?',
        name: 'Алина Козырева',
    },
    {
        id: 1,
        lastMessage:
            'Привет! Насчет твоего последнего вопроса. Предлагаю сегодня созвониться во второй половине дня и обсудить 😊',
        name: 'Алина Козырева',
    },
    {
        id: 2,
        lastMessage:
            'Привет! Насчет твоего последнего вопроса. Предлагаю сегодня созвониться во второй половине дня и обсудить 😊',
        name: 'Алина Козырева',
    },
    {
        id: 3,
        lastMessage:
            'Привет! Насчет твоего последнего вопроса. Предлагаю сегодня созвониться во второй половине дня и обсудить 😊',
        name: 'Алина Козырева',
    },
    {
        id: 4,
        lastMessage:
            'Привет! Насчет твоего последнего вопроса. Предлагаю сегодня созвониться во второй половине дня и обсудить 😊',
        name: 'Алина Козырева',
    },
    {
        id: 5,
        lastMessage:
            'Привет! Насчет твоего последнего вопроса. Предлагаю сегодня созвониться во второй половине дня и обсудить 😊',
        name: 'Алина Козырева',
    },
    {
        id: 6,
        lastMessage:
            'Привет! Насчет твоего последнего вопроса. Предлагаю сегодня созвониться во второй половине дня и обсудить 😊',
        name: 'Алина Козырева',
    },
    {
        id: 7,
        lastMessage:
            'Привет! Насчет твоего последнего вопроса. Предлагаю сегодня созвониться во второй половине дня и обсудить 😊',
        name: 'Алина Козырева',
    },
    {
        id: 8,
        lastMessage:
            'Привет! Насчет твоего последнего вопроса. Предлагаю сегодня созвониться во второй половине дня и обсудить 😊',
        name: 'Алина Козырева',
    },
];

export const InboxPage: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { chatbotId, inboxId } = useParams();
    const { pathname } = useLocation();
    const { isTablet } = useScreenDetector();
    const [open, setOpen] = useState(false);

    const currentPathname = useMemo(
        () => pathname.split('/').pop(),
        [pathname],
    );

    useEffect(() => {
        if (
            (currentPathname === 'inbox' || currentPathname === '') &&
            !isTablet
        ) {
            navigate(
                `/chatbot/${chatbotId}/dashboard/inbox/${dialogList[0].id.toString()}`,
            );
        }
    }, [chatbotId, isTablet, navigate, currentPathname]);

    useEffect(() => {
        setOpen(!!inboxId);
    }, [inboxId]);

    const renderInboxWindow = () => {
        if (isTablet) {
            return (
                <RightSideModal
                    onClose={() =>
                        navigate(`/chatbot/${chatbotId}/dashboard/inbox/`)
                    }
                    open={open}
                >
                    <InboxWindow
                        onClose={() =>
                            navigate(`/chatbot/${chatbotId}/dashboard/inbox/`)
                        }
                    />
                </RightSideModal>
            );
        }
        return <InboxWindow />;
    };

    return (
        <div className={s.InboxPage}>
            <div className={s.wrapper}>
                <InboxHeader />
                <div className={s.dialogListWrapper}>
                    <div className={s.dialogList}>
                        {dialogList.map((dialog) => (
                            <InboxItem key={dialog.id} {...dialog} />
                        ))}
                    </div>
                </div>
            </div>
            {inboxId && renderInboxWindow()}
        </div>
    );
};
