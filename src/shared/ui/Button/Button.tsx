import classNames from 'classnames';
import { ButtonHTMLAttributes, FC } from 'react';
import s from './Button.module.scss';

type ButtonVariant = 'outline' | 'fill' | 'clear';
type ButtonColor = 'dark' | 'accent' | 'red';
type ButtonSize = 'm' | 's';
type ButtonWidth = 'auto' | 'fit';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariant;
    color?: ButtonColor;
    size?: ButtonSize;
    buttonWidth?: ButtonWidth;
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        children,
        type = 'button',
        variant = 'fill',
        color = 'accent',
        size = 'm',
        buttonWidth = 'fit',
        ...otherProps
    } = props;

    return (
        <button
            type={type}
            className={classNames(s.Button, {}, [
                className,
                s[variant],
                s[color],
                s[size],
                s[buttonWidth],
            ])}
            {...otherProps}
        >
            {children}
        </button>
    );
};
