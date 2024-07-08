import { FC, useState } from 'react';
import classNames from 'classnames';
import s from './InputPassword.module.scss';
import { Button } from '@/shared/ui/Button/Button';
import EyeClosed from '@/shared/assets/icons/eye_closed.svg';
import EyeOpened from '@/shared/assets/icons/eye_opened.svg';
import { Input, InputProps } from '@/shared/ui/Input/Input';

interface InputPasswordProps extends InputProps {
    className?: string;
}

export const InputPassword: FC<InputPasswordProps> = (props) => {
    const { className, error, ...otherProps } = props;
    const [isVisible, setIsVisible] = useState(false);
    return (
        <Input
            type={isVisible ? 'text' : 'password'}
            placeholder="Текущий пароль"
            error={error}
            addonRight={
                <Button
                    variant="clear"
                    className={classNames(s.button, {
                        [s.error]: error,
                    })}
                    onClick={() => setIsVisible((prevState) => !prevState)}
                >
                    {isVisible ? (
                        <EyeOpened className={s.icon} />
                    ) : (
                        <EyeClosed className={s.icon} />
                    )}
                </Button>
            }
            {...otherProps}
        />
    );
};
