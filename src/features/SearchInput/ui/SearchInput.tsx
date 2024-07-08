import classNames from 'classnames';
import { HTMLProps, memo } from 'react';
import s from './SearchInput.module.scss';
import { Input } from '@/shared/ui/Input/Input';
import Search from '@/shared/assets/icons/search.svg';

type Width = 's' | 'm' | 'auto';

interface SearchInputProps extends HTMLProps<HTMLInputElement> {
    className?: string;
    width?: Width;
}

export const SearchInput = memo((props: SearchInputProps) => {
    const { className, onChange, value, width = 'm', ...otherProps } = props;

    return (
        <div className={classNames(s.SearchInput, {}, [className, s[width]])}>
            <Input
                width="auto"
                value={value}
                onChange={onChange}
                addonLeft={<Search className={s.icon} />}
                {...otherProps}
            />
        </div>
    );
});
