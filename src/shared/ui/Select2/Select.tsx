import classNames from 'classnames';
import { memo, useId, useState } from 'react';
import Arrow from 'shared/assets/icons/arrow-down.svg';
import s from './Select.module.scss';
import { useOutsideClick } from '@/shared/lib/hooks/useOutsideClick';
import { SelectData2 } from '@/shared/model/types/selectData';

interface OptionProps extends SelectData2 {
    selectValue?: SelectData2 | null;
    onChange: (value: SelectData2) => void;
    setOpen: (open: boolean) => void;
}

const Option = memo((props: OptionProps) => {
    const { id, name, selectValue, onChange, setOpen } = props;

    const onClick = () => {
        onChange({ id, name });
        setOpen(false);
    };

    const mods = {
        [s.selected]: selectValue?.name === name,
    };

    return (
        <li>
            <button
                type="button"
                className={classNames(s.option, mods, [])}
                onClick={onClick}
            >
                {name}
            </button>
        </li>
    );
});

type Size = 'xs' | 's' | 'm' | 'auto';

interface SelectorProps {
    className?: string;
    classNameSelect?: string;
    data?: SelectData2[];
    selectValue: SelectData2 | null;
    customSelectTitle?: string | undefined;
    onChange: (value: SelectData2) => void;
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
                        {customSelectTitle || selectValue?.name || placeholder}
                    </span>
                    <Arrow className={s.icon} />
                </button>
                {open && (
                    <ul className={s.dropdown}>
                        {data?.map((item) => (
                            <Option
                                key={item.id}
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
