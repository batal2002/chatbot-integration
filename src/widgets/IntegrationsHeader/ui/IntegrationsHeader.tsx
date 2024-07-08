import { ChangeEvent, FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchInput } from '@/features/SearchInput';
import { Select } from '@/shared/ui/Select/Select';
import s from './IntegrationsHeader.module.scss';
import { SelectData } from '@/shared/model/types/selectData';
import { IconButton } from '@/shared/ui/IconButton/IconButton';
import { SwipedModal } from '@/shared/ui/SwipedModal/SwipedModal';
import { FilterSelectTabList } from '@/shared/ui/FilterSelectTabList/FilterSelectTabList';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';
import Filter from '@/shared/assets/icons/filter.svg';

export const IntegrationsHeader: FC = () => {
    const { t } = useTranslation();

    const { isMobile } = useScreenDetector();
    const [open, setOpen] = useState(false);
    const selectData: SelectData[] = useMemo(
        () => [
            {
                value: '0',
                title: t('Все'),
            },
            {
                value: '1',
                title: t('Мессенджеры'),
            },
        ],
        [t],
    );

    const [selectValue, setSelectValue] = useState<SelectData>(selectData[0]);
    const [searchValue, setSearchValue] = useState<string>('');

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const onSelectChange = (value: SelectData) => {
        setSelectValue(value);
    };

    return (
        <div className={s.IntegrationsHeader}>
            <SearchInput
                value={searchValue}
                onChange={onSearchChange}
                placeholder={t('Поиск интеграции')}
                width={isMobile ? 'auto' : 's'}
            />
            {isMobile ? (
                <>
                    <IconButton
                        icon={<Filter />}
                        variant="outline"
                        size="l"
                        iconColor="dark"
                        onClick={() => setOpen(true)}
                    />

                    <SwipedModal open={open} onClose={() => setOpen(false)}>
                        <FilterSelectTabList
                            data={selectData}
                            label={t('Выберите тип сортировки')}
                            onChange={onSelectChange}
                            selectValue={selectValue}
                        />
                    </SwipedModal>
                </>
            ) : (
                <Select
                    size="m"
                    data={selectData}
                    selectValue={selectValue}
                    onChange={onSelectChange}
                />
            )}
        </div>
    );
};
