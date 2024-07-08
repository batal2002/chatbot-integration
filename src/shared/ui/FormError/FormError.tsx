import classNames from 'classnames';
import { FC } from 'react';
import s from './FormError.module.scss';

interface FormErrorProps {
    className?: string;
    error?: string;
}

export const FormError: FC<FormErrorProps> = (props) => {
    const { className, error } = props;

    return (
        <span className={classNames(s.FormError, {}, [className])}>
            {error}
        </span>
    );
};
