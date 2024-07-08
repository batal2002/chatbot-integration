import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import s from './FilterTab.module.scss';
import Delete from '@/shared/assets/icons/close.svg';

interface FilterSelectTabListProps {
    children: ReactNode;
    onDelete?: () => void;
    className?: string;
}

export const FilterTab: FC<FilterSelectTabListProps> = (props) => {
    const { className, children, onDelete } = props;

    return (
        <button
            type="button"
            onClick={onDelete}
            className={classNames(s.FilterTab, {}, [className])}
        >
            <span>{children}</span>
            <Delete className={s.icon} />
        </button>
    );
};
