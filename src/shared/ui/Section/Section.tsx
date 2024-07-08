import { FC, ReactNode } from 'react';
import classNames from 'classnames';
import s from './Section.module.scss';

interface SectionProps {
    children: ReactNode;
    className?: string;
}

export const Section: FC<SectionProps> = (props) => {
    const { children, className } = props;

    return (
        <div className={classNames(s.Section, {}, [className])}>{children}</div>
    );
};
