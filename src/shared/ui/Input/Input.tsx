import classNames from 'classnames';
import {
    FC,
    FocusEvent,
    forwardRef,
    HTMLProps,
    ReactNode,
    useId,
    useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import s from './Input.module.scss';

type LabelSize = 's' | 'm';
type Width = 's' | 'm' | 'auto';

export interface InputProps extends HTMLProps<HTMLInputElement> {
    className?: string;
    label?: string;
    labelSize?: LabelSize;
    placeholder?: string;
    error?: string;
    errorMessage?: string;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
    width?: Width;
}

export const Input: FC<InputProps> = forwardRef((props: InputProps, ref) => {
    const { t } = useTranslation();
    const {
        className,
        label,
        labelSize = 'm',
        placeholder,
        error,
        type = 'text',
        value = '',
        onChange,
        addonLeft,
        addonRight,
        errorMessage,
        disabled,
        width = 'auto',
        onBlur,
        ...otherProps
    } = props;
    const id = useId();

    const [isFocus, setIsFocus] = useState(false);

    const mods = {
        [s.error]: !!error,
        [s.focused]: isFocus,
    };

    const onFocus = () => {
        setIsFocus(true);
    };

    const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
        setIsFocus(false);
        onBlur?.(e);
    };

    return (
        <div className={classNames(s.Input, mods, [className, s[width]])}>
            {label && (
                <label
                    className={classNames(s.label, {}, [s[labelSize]])}
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <div className={s.wrapper}>
                {addonLeft && <div className={s.addonLeft}>{addonLeft}</div>}
                <input
                    ref={ref}
                    onFocus={onFocus}
                    onBlur={onBlurHandler}
                    value={value}
                    onChange={onChange}
                    className={s.input}
                    placeholder={placeholder || t('Введите текст')}
                    type={type}
                    id={id}
                    disabled={disabled}
                    {...otherProps}
                />
                {addonRight && <div className={s.addonRight}>{addonRight}</div>}
            </div>
            {errorMessage && errorMessage.trim().length > 0 && (
                <span className={s.errorMessage}>{t(errorMessage)}</span>
            )}
        </div>
    );
});
