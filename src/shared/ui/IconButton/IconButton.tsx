import classNames from 'classnames';
import {
    ButtonHTMLAttributes,
    FC,
    ReactElement,
    ReactNode,
    ReactSVGElement,
} from 'react';
import s from './IconButton.module.scss';
import { Loader } from '@/shared/ui/Loader/Loader';

type Color = 'light' | 'accent' | 'dark';
type IconColor = 'dark' | 'gray' | 'light';
type Size = 's' | 'm' | 'l';
type Variant = 'outline' | 'clear' | 'fill';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ReactElement<ReactSVGElement> | ReactNode;
    className?: string;
    color?: Color;
    iconColor?: IconColor;
    size?: Size;
    variant?: Variant;
    isLoading?: boolean;
}

export const IconButton: FC<IconButtonProps> = (props) => {
    const {
        className,
        icon,
        color = 'light',
        iconColor,
        size = 'm',
        variant,
        isLoading,
        ...otherProps
    } = props;

    const mods = {};
    if (isLoading)
        return (
            <div className={classNames(s.loader, {}, [s[size]])}>
                <Loader />
            </div>
        );

    return (
        <button
            type="button"
            className={classNames(s.IconButton, mods, [
                className,
                s[size],
                s[color],
                variant && s[variant],
                s[`icon-${iconColor}`],
            ])}
            {...otherProps}
        >
            {icon}
        </button>
    );
};
