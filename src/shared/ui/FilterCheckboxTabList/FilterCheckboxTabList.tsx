import classNames from 'classnames';
import { Dispatch, FC, SetStateAction } from 'react';
import s from './FilterCheckboxTabList.module.scss';
import { CheckBoxData } from '@/shared/model/types/checkBoxData';
import { InputCheckbox } from '@/shared/ui/InputCheckbox/InputCheckbox';

interface FilterSelectTabListProps {
    data: CheckBoxData[];
    setCheckBoxListData: Dispatch<SetStateAction<CheckBoxData[]>>;
    className?: string;
    label?: string;
}

export const FilterCheckboxTabList: FC<FilterSelectTabListProps> = (props) => {
    const { className, label, data, setCheckBoxListData } = props;

    const onChange = (position: number) => {
        setCheckBoxListData((prevState) =>
            prevState.map((item, index) =>
                index === position
                    ? {
                          ...item,
                          checked: !item.checked,
                      }
                    : item,
            ),
        );
    };

    return (
        <div className={classNames(s.FilterSelectTabList, {}, [className])}>
            {label && <h5 className={s.label}>{label}</h5>}
            <div className={s.wrapper}>
                {data.map(({ label, checked }, index) => (
                    <InputCheckbox
                        key={label}
                        variant="tab"
                        label={label}
                        checked={checked}
                        onChange={() => onChange(index)}
                    />
                ))}
            </div>
        </div>
    );
};
