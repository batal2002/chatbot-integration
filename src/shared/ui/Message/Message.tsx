import classNames from 'classnames';
import { FC } from 'react';
import s from './Message.module.scss';
import { CheckAnswerButton } from '@/features/CheckAnswer';
import { useSensitiveColor } from '@/shared/lib/hooks/useSensitiveColor';

type Size = 'm' | 's';
type Theme = 'dark' | 'light';

interface MessageProps {
    className?: string;
    id: string | number;
    date: Date | string;
    checkAnswerButton?: boolean;
    isUser?: boolean;
    size?: Size;
    background?: string;
    theme?: string;
    children?: string;
}

export const Message: FC<MessageProps> = (props) => {
    const {
        className,
        id,
        date,
        checkAnswerButton = false,
        isUser,
        size = 'm',
        background,
        theme = 'light',
        children,
    } = props;

    const textColor = useSensitiveColor(background);

    const mods = {
        [s.user]: isUser,
    };

    return (
        <div
            className={classNames(s.Message, mods, [
                className,
                s[size],
                s[textColor],
                s[`${theme}-theme`],
            ])}
            style={{ background }}
        >
            <span className={s.message}>{children}</span>
            <span className={s.date}>{date.toString()}</span>
            {checkAnswerButton && <CheckAnswerButton className={s.button} />}
        </div>
    );
};
