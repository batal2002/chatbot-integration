import { FC, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import s from './LogsPage.module.scss';
import { LogsHeader } from '@/widgets/LogsHeader';
import { logListItem } from '@/shared/model/types/logListItem';
import { LogWindow } from '@/widgets/LogWindow';
import { LogItem } from '@/entities/LogItem';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';
import { RightSideModal } from '@/shared/ui/RightSideModal/RightSideModal';

const dialogList: logListItem[] = [
    {
        id: 0,
        clientMessage:
            'Какие материалы мне нужно изучить перед первым рабочим днем?',
        botMessage:
            'Перед твоим первым рабочим днем, рекомендую ознакомиться с вводным курсом о компании, пройти тестирование по корпоративной этике и ознакомиться с коллегами в онлайн-пространстве.\n' +
            'Курсы можно найти на нашем корпоративном ресурсе Портал поддержки сотрудников',
        date: new Date(),
    },
    {
        id: 1,
        clientMessage:
            'Привет! Насчет твоего последнего вопроса. Предлагаю сегодня созвониться во второй половине дня и обсудить 😊',
        botMessage:
            'Привет! Насчет твоего последнего вопроса. Предлагаю сегодня созвониться во второй половине дня и обсудить 😊',
        date: new Date('2024-04-24T12:34:09'),
    },
    {
        id: 2,
        clientMessage:
            'Привет! Насчет твоего последнего вопроса. Предлагаю сегодня созвониться во второй половине дня и обсудить 😊',
        botMessage:
            'Привет! Насчет твоего последнего вопроса. Предлагаю сегодня созвониться во второй половине дня и обсудить 😊',
        date: new Date('2024-04-24T02:34:09'),
    },
    {
        id: 3,
        clientMessage:
            'Привет! Насчет твоего последнего вопроса. Предлагаю сегодня созвониться во второй половине дня и обсудить 😊',
        botMessage:
            'Привет! Насчет твоего последнего вопроса. Предлагаю сегодня созвониться во второй половине дня и обсудить 😊',
        date: new Date('12.02.2023'),
    },
    {
        id: 4,
        clientMessage:
            'Привет! Насчет твоего последнего вопроса. Предлагаю сегодня созвониться во второй половине дня и обсудить 😊',
        botMessage:
            'Привет! Насчет твоего последнего вопроса. Предлагаю сегодня созвониться во второй половине дня и обсудить 😊',
        date: new Date('12.02.2023'),
    },
    {
        id: 5,
        clientMessage:
            'Привет! Насчет твоего последнего вопроса. Предлагаю сегодня созвониться во второй половине дня и обсудить 😊',
        botMessage:
            'Привет! Насчет твоего последнего вопроса. Предлагаю сегодня созвониться во второй половине дня и обсудить 😊',
        date: new Date('12.02.2023'),
    },
    {
        id: 6,
        clientMessage:
            'Привет! Насчет твоего последнего вопроса. Предлагаю сегодня созвониться во второй половине дня и обсудить 😊',
        botMessage:
            'Привет! Насчет твоего последнего вопроса. Предлагаю сегодня созвониться во второй половине дня и обсудить 😊',
        date: new Date('12.02.2023'),
    },
    {
        id: 7,
        clientMessage:
            'Привет! Насчет твоего последнего вопроса. Предлагаю сегодня созвониться во второй половине дня и обсудить 😊',
        botMessage:
            'Привет! Насчет твоего последнего вопроса. Предлагаю сегодня созвониться во второй половине дня и обсудить 😊',
        date: new Date('12.02.2023'),
    },
    {
        id: 8,
        clientMessage:
            'Привет! Насчет твоего последнего вопроса. Предлагаю сегодня созвониться во второй половине дня и обсудить 😊',
        botMessage:
            'Привет! Насчет твоего последнего вопроса. Предлагаю сегодня созвониться во второй половине дня и обсудить 😊',
        date: new Date('12.02.2023'),
    },
];

export const LogsPage: FC = () => {
    const navigate = useNavigate();
    const { chatbotId, logsId } = useParams();
    const { pathname } = useLocation();
    const { isTablet } = useScreenDetector();
    const [open, setOpen] = useState(false);

    const currentPathname = useMemo(
        () => pathname.split('/').pop(),
        [pathname],
    );

    useEffect(() => {
        if (
            (currentPathname === 'logs' || currentPathname === '') &&
            !isTablet
        ) {
            navigate(
                `/chatbot/${chatbotId}/dashboard/logs/${dialogList[0].id.toString()}`,
            );
        }
    }, [chatbotId, isTablet, navigate, currentPathname]);

    useEffect(() => {
        setOpen(!!logsId);
    }, [logsId]);

    const renderLogWindow = () => {
        if (isTablet) {
            return (
                <RightSideModal
                    withBottomNavigation
                    onClose={() =>
                        navigate(`/chatbot/${chatbotId}/dashboard/logs/`)
                    }
                    open={open}
                    title="Лог 15.02.2024 13:00"
                >
                    <LogWindow />
                </RightSideModal>
            );
        }
        return <LogWindow />;
    };

    return (
        <div className={s.LogsPage}>
            <LogsHeader />

            <div className={s.wrapper}>
                <div className={s.dialogListWrapper}>
                    <div className={s.dialogList}>
                        {dialogList.map((dialog) => (
                            <LogItem key={dialog.id} {...dialog} />
                        ))}
                    </div>
                </div>
                {logsId && renderLogWindow()}
            </div>
        </div>
    );
};
