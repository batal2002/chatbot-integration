import { ChangeEvent, FC, memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchInput } from '@/features/SearchInput';
import { Select } from '@/shared/ui/Select/Select';
import { SelectData } from '@/shared/model/types/selectData';
import s from './AssistantsHeader.module.scss';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';
import { IconButton } from '@/shared/ui/IconButton/IconButton';
import Swap from '@/shared/assets/icons/swap.svg';
import { SwipedModal } from '@/shared/ui/SwipedModal/SwipedModal';
import { FilterSelectTabList } from '@/shared/ui/FilterSelectTabList/FilterSelectTabList';

export const AssistantsHeader: FC = memo(() => {
    const { t } = useTranslation();
    const { isMobile } = useScreenDetector();
    const [open, setOpen] = useState(false);
    const selectData = useMemo(
        () => [
            {
                value: '0',
                title: t('Последний визит'),
            },
            {
                value: '1',
                title: t('Последнее изменение'),
            },
            {
                value: '2',
                title: t('По алфавиту'),
            },
        ],
        [t],
    );

    const [selectValue, setSelectValue] = useState<SelectData>(selectData[0]);

    const [searchValue, setSearchValue] = useState<string>('');

    const onSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }, []);

    const onSelectChange = useCallback((value: SelectData) => {
        setSelectValue(value);
    }, []);

    return (
        <div className={s.AssistantsHeader}>
            <SearchInput
                value={searchValue}
                onChange={onSearchChange}
                placeholder={t('Поиск')}
                width={isMobile ? 'auto' : 'm'}
            />
            {isMobile ? (
                <>
                    <IconButton
                        icon={<Swap />}
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
});
