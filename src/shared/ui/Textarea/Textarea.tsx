import classNames from 'classnames';
import {
    ChangeEvent,
    MutableRefObject,
    RefObject,
    useEffect,
    useId,
    useRef,
    useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import s from './Textarea.module.scss';
import { Tooltip, TooltipPosition } from '@/shared/ui/Tooltip/Tooltip';
import Grabber from '@/shared/assets/icons/grabber.svg';
import { Button } from '@/shared/ui/Button/Button';
import { getNoun } from '@/shared/lib/utils/getNoun';

interface TextareaProps {
    className?: string;
    label?: string;
    placeholder?: string;
    error?: string;
    tooltipText?: string;
    tooltipPosition?: TooltipPosition;
    reset?: () => void;
    formRef?: RefObject<HTMLFormElement>;
    resize?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    rows?: number;
    counter?: boolean;
}

export const Textarea = (props: TextareaProps) => {
    const { t } = useTranslation();
    const {
        className,
        label,
        placeholder = t('Введите текст'),
        error,
        value = '',
        onChange,
        tooltipText,
        tooltipPosition,
        reset,
        formRef,
        resize,
        rows = 1,
        counter,
    } = props;
    const id = useId();
    const textbox = useRef() as MutableRefObject<HTMLTextAreaElement>;
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        if (textbox.current && textbox.current.scrollHeight < 124) {
            textbox.current.style.height = 'inherit';
            textbox.current.style.height = `${textbox.current.scrollHeight}px`;
        }
        if (value === '' && resize) {
            textbox.current.style.height = `124px`;
        }
    }, [value, textbox, resize]);

    // Submit on Enter & \n on Shift + Enter
    // const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    //     if (e.key === 'Enter' && !e.shiftKey) {
    //         e.preventDefault();
    //         formRef?.current?.dispatchEvent(
    //             new Event('submit', { bubbles: true }),
    //         );
    //     }
    // };

    const onFocus = () => {
        setIsFocus(true);
    };

    const onBlur = () => {
        setIsFocus(false);
    };

    const mods = {
        [s.error]: !!error,
        [s.resize]: resize,
        [s.focused]: isFocus,
    };

    const onChangeTrim = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div className={classNames(s.Textarea, mods, [className])}>
            {(label || tooltipText || reset) && (
                <div className={s.header}>
                    {label && (
                        <label className={s.label} htmlFor={id}>
                            {label}
                        </label>
                    )}
                    {tooltipText && (
                        <Tooltip
                            text={tooltipText}
                            position={tooltipPosition}
                        />
                    )}

                    {reset && (
                        <Button
                            className={s.reset}
                            variant="clear"
                            onClick={reset}
                        >
                            {t('Сбросить')}
                        </Button>
                    )}
                </div>
            )}
            <div className={s.wrapper}>
                <textarea
                    onFocus={onFocus}
                    onBlur={onBlur}
                    ref={textbox}
                    value={value}
                    onChange={onChangeTrim}
                    rows={rows}
                    className={s.textarea}
                    id={id}
                    placeholder={placeholder}
                />
                {resize && <Grabber className={s.customGrabber} />}
            </div>
            {counter && value.length > 0 && (
                <span className={s.counter}>
                    {value.length}{' '}
                    {getNoun(
                        value.length,
                        t('символ'),
                        t('символа'),
                        t('символов'),
                    )}
                </span>
            )}
        </div>
    );
};
