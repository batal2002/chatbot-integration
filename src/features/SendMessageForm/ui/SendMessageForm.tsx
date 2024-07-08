import classNames from 'classnames';
import { FC, FormEvent, useState } from 'react';
import s from './SendMessageForm.module.scss';
import { MessageTextarea } from '@/shared/ui/MessageTextarea/MessageTextarea';
import { IconButton } from '@/shared/ui/IconButton/IconButton';
import Send from '@/shared/assets/icons/send.svg';

interface SendMessageFormProps {
    className?: string;
    placeholder?: string;
    theme?: string;
}

export const SendMessageForm: FC<SendMessageFormProps> = (props) => {
    const { className, placeholder, theme } = props;
    const [message, setMessage] = useState('');

    return (
        <form className={classNames(s.SendMessageForm, {}, [className])}>
            <MessageTextarea
                disabled
                placeholder={placeholder}
                value={message}
                onChange={(e: FormEvent<HTMLTextAreaElement>) =>
                    setMessage((e.target as HTMLTextAreaElement).value)
                }
            />
            <IconButton
                icon={<Send />}
                variant={theme === 'dark' ? 'clear' : 'fill'}
                className={s.button}
            />
        </form>
    );
};
