import classNames from 'classnames';
import { FC } from 'react';
import s from './FilterSelectTabList.module.scss';
import { SelectData } from '@/shared/model/types/selectData';

interface FilterSelectTabListProps {
    selectValue: SelectData | null;
    className?: string;
    label?: string;
    data: SelectData[];
    onChange: (value: SelectData) => void;
}

export const FilterSelectTabList: FC<FilterSelectTabListProps> = (props) => {
    const { className, label, data, onChange, selectValue } = props;

    const onClick = ({ value, title }: SelectData) => {
        onChange({ value, title });
    };

    return (
        <div className={classNames(s.FilterSelectTabList, {}, [className])}>
            {label && <h5 className={s.label}>{label}</h5>}
            <div className={s.wrapper}>
                {data.map(({ title, value, count }) => (
                    <button
                        key={value}
                        type="button"
                        onClick={() => onClick({ title, value })}
                        className={classNames(s.tab, {
                            [s.active]: selectValue?.value === value,
                        })}
                    >
                        {title}
                        {count !== undefined && count >= 0 && (
                            <span className={s.count}>{` - ${count}`}</span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};
