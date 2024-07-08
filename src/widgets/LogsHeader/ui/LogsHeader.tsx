import { FC, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Select } from '@/shared/ui/Select/Select';
import { SelectData } from '@/shared/model/types/selectData';
import s from './LogsHeader.module.scss';
import {
    DropdownList,
    DropdownListData,
} from '@/shared/ui/DropdownList/DropdownList';
import { Button } from '@/shared/ui/Button/Button';
import Download from '@/shared/assets/icons/download.svg';
import { CustomDatePicker } from '@/shared/ui/CustomDatePicker/CustomDatePicker';
import { DropdownCheckbox } from '@/shared/ui/DropdownCheckbox/DropdownCheckbox';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';
import { IconButton } from '@/shared/ui/IconButton/IconButton';
import Filter from '@/shared/assets/icons/filter.svg';
import { SwipedModal } from '@/shared/ui/SwipedModal/SwipedModal';
import { FilterSelectTabList } from '@/shared/ui/FilterSelectTabList/FilterSelectTabList';
import { CheckBoxData } from '@/shared/model/types/checkBoxData';
import { FilterCheckboxTabList } from '@/shared/ui/FilterCheckboxTabList/FilterCheckboxTabList';
import { FilterTabList } from '@/shared/ui/FilterTabList/FilterTabList';
import { FilterTab } from '@/shared/ui/FilterTab/FilterTab';

const dropdownData: DropdownListData[] = [
    {
        label: 'PDF',
        onClick: () => {},
    },
    {
        label: 'XLSX',
        onClick: () => {},
    },
    {
        label: 'DOC',
        onClick: () => {},
    },
    {
        label: 'DOCX',
        onClick: () => {},
    },
    {
        label: 'PPTX',
        onClick: () => {},
    },
    {
        label: 'HTML',
        onClick: () => {},
    },
    {
        label: 'TXT',
        onClick: () => {},
    },
    {
        label: 'PAGES',
        onClick: () => {},
    },
    {
        label: 'EPUB',
        onClick: () => {},
    },
    {
        label: 'DJVU',
        onClick: () => {},
    },
];

const exportSelectData: SelectData[] = [
    {
        value: '0',
        title: 'PDF',
    },
    {
        value: '1',
        title: 'XLSX',
    },
    {
        value: '2',
        title: 'DOC',
    },
    {
        value: '3',
        title: 'DOCX',
    },
    {
        value: '4',
        title: 'PPTX',
    },
    {
        value: '5',
        title: 'HTML',
    },
    {
        value: '6',
        title: 'TXT',
    },
    {
        value: '7',
        title: 'PAGES',
    },
    {
        value: '8',
        title: 'EPUB',
    },
    {
        value: '9',
        title: 'DJVU',
    },
];

const checkBoxList: CheckBoxData[] = [
    {
        label: 'API',
        checked: false,
    },
    {
        label: 'Сайт',
        checked: false,
    },
    {
        label: 'Telegram',
        checked: false,
    },
    {
        label: 'WhatsApp',
        checked: false,
    },
    {
        label: 'Неизвестно',
        checked: false,
    },
];

export const LogsHeader: FC = () => {
    const { t } = useTranslation();
    const { isMobile } = useScreenDetector();
    const selectData: SelectData[] = useMemo(
        () => [
            {
                value: '0',
                title: t('Все'),
            },
            {
                value: '1',
                title: '< 10%',
            },
            {
                value: '2',
                title: '< 20%',
            },
            {
                value: '3',
                title: '< 30%',
            },
            {
                value: '4',
                title: '< 40%',
            },
            {
                value: '5',
                title: '< 50%',
            },
            {
                value: '6',
                title: '< 60%',
            },
            {
                value: '7',
                title: '< 70%',
            },
            {
                value: '8',
                title: '< 80%',
            },
        ],
        [t],
    );
    const [openExport, setOpenExport] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectConfidence, setSelectConfidence] = useState<SelectData | null>(
        null,
    );
    const [selectExport, setSelectExport] = useState<SelectData | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [checkBoxListData, setCheckBoxListData] =
        useState<CheckBoxData[]>(checkBoxList);

    const onSelectChange = useCallback((value: SelectData) => {
        setSelectConfidence(value);
    }, []);

    const onDeleteCheckbox = (index: number) => {
        setCheckBoxListData((prevState) =>
            prevState.map((item, currentIndex) =>
                index === currentIndex
                    ? {
                          ...item,
                          checked: !item.checked,
                      }
                    : item,
            ),
        );
    };
    const onDeleteDate = () => {
        setStartDate(null);
        setEndDate(null);
    };

    return (
        <div className={s.LogsHeader}>
            {isMobile ? (
                <>
                    <div className={s.headerWrapper}>
                        <Button
                            onClick={() => setOpenExport(true)}
                            size="s"
                            className={s.export}
                        >
                            <Download />
                            {t('Экпорт')}
                        </Button>

                        <SwipedModal
                            open={openExport}
                            onClose={() => setOpenExport(false)}
                        >
                            <FilterSelectTabList
                                data={exportSelectData}
                                label={t('Выберите формат экспорта')}
                                onChange={setSelectExport}
                                selectValue={selectExport}
                            />
                            <Button
                                buttonWidth="auto"
                                size="s"
                                className={s.exportLogs}
                                disabled={!selectExport}
                            >
                                <Download className={s.icon} />
                                {t('Экспорт логов')}
                            </Button>
                        </SwipedModal>

                        <IconButton
                            icon={<Filter />}
                            variant="outline"
                            size="l"
                            iconColor="dark"
                            onClick={() => setOpen(true)}
                        />

                        <SwipedModal open={open} onClose={() => setOpen(false)}>
                            <div className={s.list}>
                                <FilterSelectTabList
                                    data={selectData}
                                    label={t('Уверенность')}
                                    onChange={setSelectConfidence}
                                    selectValue={selectConfidence}
                                />
                                <FilterCheckboxTabList
                                    data={checkBoxListData}
                                    label={t('Источники')}
                                    setCheckBoxListData={setCheckBoxListData}
                                />
                                <CustomDatePicker
                                    startDate={startDate}
                                    setStartDate={setStartDate}
                                    endDate={endDate}
                                    setEndDate={setEndDate}
                                    withPortal={isMobile}
                                />
                            </div>
                        </SwipedModal>
                    </div>

                    {(selectConfidence ||
                        startDate ||
                        checkBoxListData.some(({ checked }) => checked)) && (
                        <FilterTabList>
                            {selectConfidence && (
                                <FilterTab
                                    onDelete={() => setSelectConfidence(null)}
                                >
                                    {selectConfidence.title}
                                </FilterTab>
                            )}
                            {checkBoxListData &&
                                checkBoxListData.map(
                                    ({ label, checked }, index) => {
                                        return checked ? (
                                            <FilterTab
                                                key={label}
                                                onDelete={() =>
                                                    onDeleteCheckbox(index)
                                                }
                                            >
                                                {label}
                                            </FilterTab>
                                        ) : null;
                                    },
                                )}
                            {startDate && (
                                <FilterTab onDelete={onDeleteDate}>
                                    {startDate?.toLocaleString('ru', {
                                        day: 'numeric',
                                        month: 'numeric',
                                        year: 'numeric',
                                    })}{' '}
                                    {endDate &&
                                        `- ${endDate.toLocaleString('ru', {
                                            day: 'numeric',
                                            month: 'numeric',
                                            year: 'numeric',
                                        })}`}
                                </FilterTab>
                            )}
                        </FilterTabList>
                    )}
                </>
            ) : (
                <>
                    <CustomDatePicker
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                    />

                    <Select
                        className={s.select}
                        placeholder={t('Уверенность')}
                        size="s"
                        data={selectData}
                        customSelectTitle={
                            selectConfidence?.value !== '8'
                                ? `${t('Уверенность')} ${selectConfidence?.title || ''}`
                                : selectConfidence?.title
                        }
                        selectValue={selectConfidence}
                        onChange={setSelectConfidence}
                    />

                    <DropdownCheckbox
                        data={checkBoxListData}
                        title={t('Источники')}
                        setCheckBoxListData={setCheckBoxListData}
                    />

                    <DropdownList
                        data={dropdownData}
                        className={s.export}
                        size="auto"
                    >
                        <Button>
                            <Download />
                            {t('Экпорт')}
                        </Button>
                    </DropdownList>
                </>
            )}
        </div>
    );
};
