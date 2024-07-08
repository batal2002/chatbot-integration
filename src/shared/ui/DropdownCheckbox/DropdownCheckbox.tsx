import { Dispatch, FC, SetStateAction, useState } from 'react';
import classNames from 'classnames';
import s from './DropdownCheckbox.module.scss';
import { useOutsideClick } from '@/shared/lib/hooks/useOutsideClick';
import Arrow from '@/shared/assets/icons/arrow-down.svg';
import { InputCheckbox } from '@/shared/ui/InputCheckbox/InputCheckbox';
import { CheckBoxData } from '@/shared/model/types/checkBoxData';

type Size = 'm' | 'auto';

interface DropdownCheckboxListProps {
    data: CheckBoxData[];
    setCheckBoxListData: Dispatch<SetStateAction<CheckBoxData[]>>;
    className?: string;
    size?: Size;
    title: string;
}

export const DropdownCheckbox: FC<DropdownCheckboxListProps> = (props) => {
    const { className, data, title, size = 'm', setCheckBoxListData } = props;

    const [open, setOpen] = useState(false);
    const ref = useOutsideClick({ open, onClose: () => setOpen(false) });

    const onChange = (position: number) => {
        setCheckBoxListData((prevState) =>
            prevState.map((item, index) =>
                index === position ? { ...item, checked: !item.checked } : item,
            ),
        );
    };

    const mods = {
        [s.open]: open,
    };

    return (
        <div
            ref={ref}
            className={classNames(s.DropdownCheckbox, mods, [
                className,
                s[size],
            ])}
        >
            <button
                type="button"
                className={s.select}
                onClick={() => setOpen(!open)}
            >
                <span>{title}</span>
                <Arrow className={s.icon} />
            </button>
            {open && (
                <ul className={s.dropdown}>
                    {data.map(({ label, checked }, index) => (
                        <li key={label} className={s.item}>
                            <InputCheckbox
                                label={label}
                                checked={checked}
                                onChange={() => onChange(index)}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
