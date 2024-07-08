import { cloneElement, FC, ReactElement, useState } from 'react';
import classNames from 'classnames';
import s from './DropdownList.module.scss';
import { useOutsideClick } from '@/shared/lib/hooks/useOutsideClick';

export interface DropdownListData {
    label: string;
    onClick: () => void;
}

type Size = 'm' | 'auto';

interface DropdownListProps {
    data: DropdownListData[];
    className?: string;
    children: ReactElement;
    size?: Size;
}

export const DropdownList: FC<DropdownListProps> = (props) => {
    const { className, data, children, size = 'm' } = props;

    const [open, setOpen] = useState(false);
    const ref = useOutsideClick({ open, onClose: () => setOpen(false) });

    const onChildClick = () => {
        setOpen(!open);
    };

    const onItemClick = (onClick: () => void) => {
        onClick();
        setOpen(false);
    };

    return (
        <div
            ref={ref}
            className={classNames(s.DropdownList, {}, [className, s[size]])}
        >
            {cloneElement(children, { onClick: onChildClick })}
            {open && (
                <ul className={s.dropdown}>
                    {data.map(({ label, onClick }) => (
                        <li key={label}>
                            <button
                                type="button"
                                className={s.item}
                                onClick={() => onItemClick(onClick)}
                            >
                                {label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
