import classNames from 'classnames';
import { FC, HTMLProps, useId } from 'react';
import s from './InputCheckbox.module.scss';

type Variant = 'normal' | 'tab';

interface InputProps extends HTMLProps<HTMLInputElement> {
    className?: string;
    label: string;
    error?: string;
    variant?: Variant;
}

export const InputCheckbox: FC<InputProps> = (props) => {
    const {
        className,
        label,
        error,
        checked = false,
        onChange,
        variant = 'normal',
    } = props;
    const id = useId();

    const mods = {
        [s.error]: !!error,
        [s.checked]: checked,
    };

    return (
        <div className={classNames(s.Input, mods, [className, [s[variant]]])}>
            <label htmlFor={id} className={s.wrapper}>
                <div className={s.checkbox} />
                <span className={s.label}>{label}</span>
            </label>
            <input
                className={s.input}
                type="checkbox"
                id={id}
                checked={checked}
                onChange={onChange}
            />
        </div>
    );
};
