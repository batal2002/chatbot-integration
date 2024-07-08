import { ChangeEvent, FC, memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchInput } from '@/features/SearchInput';
import { AddMemberButton } from '@/features/AddMember';
import { Select } from '@/shared/ui/Select/Select';
import { SelectData } from '@/shared/model/types/selectData';
import s from './TeamHeader.module.scss';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';
import { IconButton } from '@/shared/ui/IconButton/IconButton';
import Filter from '@/shared/assets/icons/filter.svg';
import { SwipedModal } from '@/shared/ui/SwipedModal/SwipedModal';
import { FilterSelectTabList } from '@/shared/ui/FilterSelectTabList/FilterSelectTabList';

export const TeamHeader: FC = memo(() => {
    const { t } = useTranslation();
    const { isTablet, isMobile } = useScreenDetector();

    const [open, setOpen] = useState(false);
    const selectData = useMemo(
        () => [
            {
                value: '0',
                title: t('Все роли'),
                count: 1,
            },
            {
                value: '1',
                title: t('Владелец'),
                count: 1,
            },
            {
                value: '2',
                title: t('Администратор'),
                count: 0,
            },
            {
                value: '3',
                title: t('Редактор'),
                count: 0,
            },
            {
                value: '4',
                title: t('Наблюдатель'),
                count: 0,
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
        <div className={s.TeamHeader}>
            <div className={s.wrapper}>
                <SearchInput
                    value={searchValue}
                    onChange={onSearchChange}
                    placeholder={t('Поиск')}
                    width={isTablet ? 'auto' : 'm'}
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
            {!isMobile && <AddMemberButton className={s.button} />}
        </div>
    );
});
