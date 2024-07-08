import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import s from './ChatbotDialog.module.scss';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { IconButton } from '@/shared/ui/IconButton/IconButton';
import Reset from '@/shared/assets/icons/reset.svg';
import { SendMessageForm } from '@/features/SendMessageForm';
import defaultAvatar from '@/shared/assets/images/chatbotAvatar.png';
import { InterfaceFormData } from '@/features/InterfaceForm/model/types/interface';
import { useSensitiveColor } from '@/shared/lib/hooks/useSensitiveColor';
import { Message } from '@/shared/ui/Message/Message';
import Arrow from '@/shared/assets/icons/arrow-left.svg';

interface ChatbotDialogProps {
    className?: string;
    formData?: Partial<InterfaceFormData>;
    fullPage?: boolean;
    fullPageOnClose?: () => void;
}

export const ChatbotDialog: FC<ChatbotDialogProps> = (props) => {
    const { className, formData, fullPage, fullPageOnClose } = props;
    const {
        welcomeMessage,
        placeholder,
        displayName,
        profileImage,
        withoutProfileImage,
        messageColor,
        theme,
    } = { ...formData };
    const sensitiveColor = useSensitiveColor(messageColor);
    const [profileImageBase64, setProfileImageBase64] = useState<string>('');

    const [currentTheme, setCurrentTheme] = useState('light');

    useEffect(() => {
        if (theme) {
            setCurrentTheme(theme?.value);
        }
    }, [theme]);

    useEffect(() => {
        if (profileImage && !withoutProfileImage) {
            const reader = new FileReader();

            reader.readAsDataURL(profileImage);

            reader.onload = function (e) {
                setProfileImageBase64(e.target?.result as string);
            };
        } else {
            setProfileImageBase64('');
        }
    }, [profileImage, withoutProfileImage]);

    const mods = {
        [s.fullPage]: fullPage,
    };

    return (
        <div
            className={classNames(s.ChatbotDialog, mods, [
                className,
                s[currentTheme],
            ])}
        >
            <div className={s.header} style={{ background: messageColor }}>
                <div className={s.info}>
                    {fullPage && (
                        <button
                            type="button"
                            onClick={fullPageOnClose}
                            className={s.closeBtn}
                        >
                            <Arrow />
                        </button>
                    )}
                    {!withoutProfileImage && (
                        <Avatar
                            size="s"
                            image={profileImageBase64 || defaultAvatar}
                        />
                    )}
                    <span className={`${s.name} ${s[sensitiveColor]}`}>
                        {displayName}
                    </span>
                </div>
                <IconButton
                    icon={<Reset />}
                    color={sensitiveColor === 'light' ? 'accent' : 'light'}
                    iconColor={sensitiveColor === 'light' ? 'light' : 'dark'}
                    variant="clear"
                />
            </div>
            <div className={s.wrapper}>
                <div className={s.chat}>
                    <Message
                        id={1}
                        date="12:30"
                        isUser
                        background={messageColor}
                    >
                        Привет!
                    </Message>
                    {welcomeMessage && (
                        <Message id={0} date="12:30" theme={currentTheme}>
                            {welcomeMessage}
                        </Message>
                    )}
                    <span className={s.date}>Сегодня</span>
                </div>
            </div>
            <SendMessageForm placeholder={placeholder} theme={theme?.value} />
        </div>
    );
};
