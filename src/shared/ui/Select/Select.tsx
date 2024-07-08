import classNames from 'classnames';
import { memo, useId, useState } from 'react';
import Arrow from 'shared/assets/icons/arrow-down.svg';
import s from './Select.module.scss';
import { useOutsideClick } from '@/shared/lib/hooks/useOutsideClick';
import { SelectData } from '@/shared/model/types/selectData';

interface OptionProps extends SelectData {
    selectValue: SelectData | null;
    onChange: (value: SelectData) => void;
    count?: number;
    setOpen: (open: boolean) => void;
}

const Option = memo((props: OptionProps) => {
    const { value, title, selectValue, count, onChange, setOpen } = props;

    const onClick = () => {
        onChange({ value, title });
        setOpen(false);
    };

    const mods = {
        [s.selected]: selectValue?.value === value,
    };

    return (
        <li>
            <button
                type="button"
                className={classNames(s.option, mods, [])}
                onClick={onClick}
            >
                {title}
                {count !== undefined && count >= 0 && (
                    <span className={s.count}>{` - ${count}`}</span>
                )}
            </button>
        </li>
    );
});

type Size = 'xs' | 's' | 'm' | 'auto';

interface SelectorProps {
    className?: string;
    classNameSelect?: string;
    data: SelectData[];
    selectValue: SelectData | null;
    customSelectTitle?: string | undefined;
    onChange: (value: SelectData) => void;
    placeholder?: string;
    size?: Size;
    label?: string;
    error?: string;
}

export const Select = memo((props: SelectorProps) => {
    const {
        className,
        classNameSelect,
        data,
        customSelectTitle,
        selectValue,
        onChange,
        placeholder,
        size = 'auto',
        label,
        error,
    } = props;
    const id = useId();
    const [open, setOpen] = useState(false);

    const ref = useOutsideClick({ open, onClose: () => setOpen(false) });

    const mods = {
        [s.open]: open,
        [s.error]: error,
    };

    return (
        <div className={classNames(s.Select, mods, [className, s[size]])}>
            {label && (
                <label htmlFor={id} className={s.label}>
                    {label}
                </label>
            )}
            <div ref={ref}>
                <button
                    id={id}
                    type="button"
                    className={classNames(s.select, {}, classNameSelect)}
                    onClick={() => setOpen(!open)}
                >
                    <span>
                        {customSelectTitle || selectValue?.title || placeholder}
                    </span>
                    <Arrow className={s.icon} />
                </button>
                {open && (
                    <ul className={s.dropdown}>
                        {data.map((item) => (
                            <Option
                                key={item.value}
                                onChange={onChange}
                                selectValue={selectValue}
                                setOpen={setOpen}
                                {...item}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
});
