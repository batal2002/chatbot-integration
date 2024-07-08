import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import s from './FilterTabList.module.scss';

interface FilterSelectTabListProps {
    children: ReactNode;
    className?: string;
}

export const FilterTabList: FC<FilterSelectTabListProps> = (props) => {
    const { className, children } = props;

    return (
        <div
            className={classNames(s.FilterTabList, {}, [className])}
            onTouchMove={(e) => e.stopPropagation()}
        >
            <div className={s.wrapper}>{children}</div>
        </div>
    );
};
