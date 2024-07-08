import classNames from 'classnames';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import s from './InboxWindow.module.scss';
import { Message } from '@/shared/ui/Message/Message';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import Bot from '@/shared/assets/icons/bot.svg';
import { SendMessageForm } from '@/features/SendMessageForm';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';
import Arrow from '@/shared/assets/icons/arrow-left.svg';

interface LogWindowProps {
    className?: string;
    onClose?: () => void;
}

const messageList = [
    {
        id: 3,
        text: 'Козырева Алина Сергеевна',
        date: '12:26',
    },
    {
        id: 2,
        text: 'Супер! Напиши свое имя и телефон, и наш менеджер перезвонит в ближайшее время',
        date: '12:23',
        isUser: true,
        name: 'Н',
    },
    {
        id: 1,
        text: 'Хочу попробовать пробный период',
        date: '12:22',
    },
    {
        id: 0,
        text: 'Привет! Чем могу помочь?',
        confidence: 90,
        date: '12:21',
        isBot: true,
    },
];

export const InboxWindow: FC<LogWindowProps> = (props) => {
    const { className, onClose } = props;
    const { t } = useTranslation();
    const { isTablet, isMobile } = useScreenDetector();

    return (
        <div className={classNames(s.InboxWindow, {}, [className])}>
            <div className={s.header}>
                {isTablet && (
                    <button
                        type="button"
                        onClick={onClose}
                        className={s.closeBtn}
                    >
                        <Arrow />
                    </button>
                )}
                <Avatar name="а" size={isMobile ? 's' : 'm'} />
                <div className={s.info}>
                    <span className={s.name}>Алина Козырева</span>
                    <div className={s.source}>Telegram</div>
                </div>
            </div>
            <div className={s.windowWrapper}>
                <div className={s.window}>
                    {messageList.map(
                        ({
                            id,
                            date,
                            text,
                            confidence,
                            isUser,
                            isBot,
                            name,
                        }) =>
                            isUser || isBot ? (
                                <div key={id} className={s.messageWrapper}>
                                    <div>
                                        <Message
                                            key={id}
                                            date={date}
                                            id={id}
                                            isUser={isUser || isBot}
                                            size="s"
                                        >
                                            {text}
                                        </Message>
                                        {isBot && (
                                            <span className={s.confidence}>
                                                {t('Уверенность')} {confidence}%
                                            </span>
                                        )}
                                    </div>
                                    {isBot ? (
                                        <Avatar icon={<Bot />} size="s" />
                                    ) : (
                                        <Avatar name={name} size="s" />
                                    )}
                                </div>
                            ) : (
                                <Message key={id} date={date} id={id}>
                                    {text}
                                </Message>
                            ),
                    )}
                </div>
            </div>
            <SendMessageForm />
        </div>
    );
};
