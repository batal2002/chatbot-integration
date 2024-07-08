import classNames from 'classnames';
import { ButtonHTMLAttributes, FC, useEffect, useState } from 'react';
import Logo from 'shared/assets/icons/logo.svg';
import s from './ChatbotButton.module.scss';
import { useSensitiveColor } from '@/shared/lib/hooks/useSensitiveColor';

interface ChatbotButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    color?: string;
    chatbotIcon?: File;
    position?: string;
}

export const ChatbotButton: FC<ChatbotButtonProps> = (props) => {
    const { className, color, chatbotIcon, position, ...otherProps } = props;
    const sensitiveColor = useSensitiveColor(color);
    const [chatbotIconBase64, setChatbotIconBase64] = useState<string>('');

    useEffect(() => {
        if (chatbotIcon) {
            const reader = new FileReader();

            reader.readAsDataURL(chatbotIcon);

            reader.onload = function (e) {
                setChatbotIconBase64(e.target?.result as string);
            };
        } else {
            setChatbotIconBase64('');
        }
    }, [chatbotIcon]);

    const mods = {
        [s.right]: position === 'right',
    };

    return (
        <button
            type="button"
            className={classNames(s.ChatbotButton, mods, [className])}
            style={{ backgroundColor: color }}
            {...otherProps}
        >
            {chatbotIconBase64 ? (
                <img className={s.image} src={chatbotIconBase64} alt="" />
            ) : (
                <Logo className={`${s.icon} ${s[sensitiveColor]}`} />
            )}
        </button>
    );
};
