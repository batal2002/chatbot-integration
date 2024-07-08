import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Select } from '@/shared/ui/Select/Select';
import s from './InboxHeader.module.scss';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';
import { IconButton } from '@/shared/ui/IconButton/IconButton';
import Filter from '@/shared/assets/icons/filter.svg';
import { SwipedModal } from '@/shared/ui/SwipedModal/SwipedModal';
import { FilterSelectTabList } from '@/shared/ui/FilterSelectTabList/FilterSelectTabList';
import { SearchInput } from '@/features/SearchInput';
import { SelectData } from '@/shared/model/types/selectData';
import { FilterTabList } from '@/shared/ui/FilterTabList/FilterTabList';
import { FilterTab } from '@/shared/ui/FilterTab/FilterTab';

export const InboxHeader: FC = () => {
    const { t } = useTranslation();
    const { isMobile } = useScreenDetector();
    const selectData = useMemo(
        () => [
            {
                value: '0',
                title: t('Все'),
            },
            {
                value: '1',
                title: t('Не прочитано'),
            },
            {
                value: '1',
                title: t('Не отвечено'),
            },
        ],
        [t],
    );
    const channelSelectData = useMemo(
        () => [
            {
                value: '0',
                title: t('Все каналы'),
            },
            {
                value: '1',
                title: 'Telegram',
            },
            {
                value: '2',
                title: 'WhatsApp',
            },
            {
                value: '3',
                title: 'LinkedIn',
            },
        ],
        [t],
    );
    const [selectValue, setSelectValue] = useState<SelectData>(selectData[0]);
    const [channelValue, setChannelValue] = useState<SelectData>(
        channelSelectData[0],
    );
    const [searchValue, setSearchValue] = useState('');
    const onSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }, []);
    const [openFilter, setOpenFilter] = useState(false);
    return (
        <div className={s.InboxHeader}>
            <SearchInput
                width="auto"
                value={searchValue}
                onChange={onSearchChange}
            />
            {isMobile ? (
                <>
                    <IconButton
                        icon={<Filter />}
                        variant="outline"
                        size="l"
                        iconColor="dark"
                        onClick={() => setOpenFilter(true)}
                    />

                    <SwipedModal
                        open={openFilter}
                        onClose={() => setOpenFilter(false)}
                    >
                        <div className={s.swipedWrapper}>
                            <FilterSelectTabList
                                data={selectData}
                                label={t('Сообщения')}
                                onChange={setSelectValue}
                                selectValue={selectValue}
                            />
                            <FilterSelectTabList
                                data={channelSelectData}
                                label={t('Каналы')}
                                onChange={setChannelValue}
                                selectValue={channelValue}
                            />
                        </div>
                    </SwipedModal>
                </>
            ) : (
                <div className={s.selectWrapper}>
                    <Select
                        size="auto"
                        data={selectData}
                        selectValue={selectValue}
                        onChange={setSelectValue}
                    />
                    <Select
                        size="auto"
                        data={channelSelectData}
                        selectValue={channelValue}
                        onChange={setChannelValue}
                    />
                </div>
            )}
            {isMobile &&
                (selectValue.value !== '0' || channelValue.value !== '0') && (
                    <FilterTabList className={s.filterList}>
                        {selectValue.value !== '0' && (
                            <FilterTab
                                onDelete={() => setSelectValue(selectData[0])}
                            >
                                {selectValue.title}
                            </FilterTab>
                        )}
                        {channelValue.value !== '0' && (
                            <FilterTab
                                onDelete={() =>
                                    setChannelValue(channelSelectData[0])
                                }
                            >
                                {channelValue.title}
                            </FilterTab>
                        )}
                    </FilterTabList>
                )}
        </div>
    );
};
