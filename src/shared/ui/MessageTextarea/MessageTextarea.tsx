import classNames from 'classnames';
import {
    HTMLProps,
    MutableRefObject,
    RefObject,
    useEffect,
    useRef,
} from 'react';
import { useTranslation } from 'react-i18next';
import s from './MessageTextarea.module.scss';

interface TextareaProps extends HTMLProps<HTMLTextAreaElement> {
    className?: string;
    label?: string;
    placeholder?: string;
    error?: string;
    formRef?: RefObject<HTMLFormElement>;
}

export const MessageTextarea = (props: TextareaProps) => {
    const { t } = useTranslation();
    const {
        className,
        label,
        placeholder,
        error,
        value = '',
        onChange,
        formRef,
        ...otherProps
    } = props;
    const textbox = useRef() as MutableRefObject<HTMLTextAreaElement>;

    useEffect(() => {
        if (textbox.current) {
            textbox.current.style.height = 'inherit';
            textbox.current.style.height = `${textbox.current.scrollHeight}px`;
        }
    }, [value, textbox]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            formRef?.current?.dispatchEvent(
                new Event('submit', { cancelable: true, bubbles: true }),
            );
        }
    };

    const mods = {
        [s.error]: !!error,
    };

    return (
        <div className={classNames(s.Textarea, mods, [className])}>
            <textarea
                ref={textbox}
                value={value}
                onChange={onChange}
                rows={1}
                className={s.textarea}
                placeholder={placeholder || t('Введите текст')}
                onKeyDown={handleKeyDown}
                {...otherProps}
            />
        </div>
    );
};
