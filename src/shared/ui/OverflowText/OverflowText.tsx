import classNames from 'classnames';
import { FC } from 'react';
import s from './OverflowText.module.scss';

interface OverflowTextProps {
    className?: string;
    children?: string;
}

export const OverflowText: FC<OverflowTextProps> = (props) => {
    const { className, children } = props;

    return (
        <div className={classNames(s.OverflowText, {}, [className])}>
            <span className={s.text}>{children}</span>
        </div>
    );
};
