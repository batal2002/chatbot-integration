import classNames from 'classnames';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import s from './LogWindow.module.scss';
import { Message } from '@/shared/ui/Message/Message';

interface LogWindowProps {
    className?: string;
}

const messageList = [
    {
        id: 4,
        text:
            'Перед твоим первым рабочим днем, рекомендую ознакомиться с вводным курсом о компании, пройти тестирование по корпоративной этике и ознакомиться с коллегами в онлайн-пространстве.\n' +
            'Курсы можно найти на нашем корпоративном ресурсе Портал поддержки сотрудников',
        confidence: 90,
        date: '12:21',
    },
    {
        id: 3,
        text:
            'Перед твоим первым рабочим днем, рекомендую ознакомиться с вводным курсом о компании, пройти тестирование по корпоративной этике и ознакомиться с коллегами в онлайн-пространстве.\n' +
            'Курсы можно найти на нашем корпоративном ресурсе Портал поддержки сотрудников',
        confidence: 90,
        date: '12:21',
    },
    {
        id: 2,
        text:
            'Перед твоим первым рабочим днем, рекомендую ознакомиться с вводным курсом о компании, пройти тестирование по корпоративной этике и ознакомиться с коллегами в онлайн-пространстве.\n' +
            'Курсы можно найти на нашем корпоративном ресурсе Портал поддержки сотрудников',
        confidence: 90,
        date: '12:21',
    },
    {
        id: 1,
        text: 'Какие материалы мне нужно изучить перед первым рабочим днем?',
        isUser: true,
        date: '12:20',
    },
    {
        id: 0,
        text: 'Привет, я твой помощник. Помогу тебе влиться в новый коллектив и сориентироваться на новом рабочем месте',
        confidence: 90,
        date: '12:19',
    },
];

export const LogWindow: FC<LogWindowProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation();
    return (
        <div className={classNames(s.LogWindow, {}, [className])}>
            <div className={s.window}>
                {messageList.map(
                    ({ id, date, text, confidence, isUser }, index) =>
                        isUser ? (
                            <Message
                                key={id}
                                date={date}
                                id={id}
                                isUser
                                size="s"
                            >
                                {text}
                            </Message>
                        ) : (
                            <div key={id} className={s.messageWrapper}>
                                <Message
                                    date={date}
                                    id={id}
                                    checkAnswerButton={index === 0}
                                >
                                    {text}
                                </Message>
                                <span className={s.confidence}>
                                    {t('Уверенность')} {confidence}%
                                </span>
                            </div>
                        ),
                )}
            </div>
        </div>
    );
};
