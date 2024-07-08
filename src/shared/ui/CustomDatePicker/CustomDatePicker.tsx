import {
    Dispatch,
    FC,
    ReactNode,
    SetStateAction,
    useMemo,
    useState,
} from 'react';
import DatePicker, {
    CalendarContainer,
    CalendarContainerProps,
} from 'react-datepicker';
import './CustomDatePicker.scss';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui/Input/Input';
import { IconButton } from '@/shared/ui/IconButton/IconButton';
import Calendar from '@/shared/assets/icons/calendar.svg';
import ArrowLeft from '@/shared/assets/icons/arrow-left.svg';
import ArrowRight from '@/shared/assets/icons/arrow-right.svg';
import s from './CustomDatePicker.module.scss';
import { Button } from '@/shared/ui/Button/Button';
import { Portal } from '@/shared/ui/Portal/Portal';
import { Overlay } from '@/shared/ui/Overlay/Overlay';

interface DatePickerProps {
    className?: string;
    startDate: Date | null;
    setStartDate: Dispatch<SetStateAction<Date | null>>;
    endDate: Date | null;
    setEndDate: Dispatch<SetStateAction<Date | null>>;
    withPortal?: boolean;
}

interface ButtonsData {
    title: string;
    onClick: () => void;
}

interface MyContainerProps extends CalendarContainerProps {
    children?: ReactNode;
    buttonsData?: ButtonsData[];
    withPortal?: boolean;
    onClose?: () => void;
}

const MyContainer: FC<MyContainerProps> = ({
    children,
    buttonsData,
    withPortal,
    onClose,
}) => {
    const { t } = useTranslation();

    if (withPortal)
        return (
            <Portal>
                <div className={s.portalWrapper}>
                    <CalendarContainer className={s.container}>
                        <div className={s.calendar}>{children}</div>
                    </CalendarContainer>
                    {onClose && <Overlay onClose={onClose} />}
                </div>
            </Portal>
        );

    return (
        <CalendarContainer className={s.container}>
            {buttonsData && (
                <ul className={s.nav}>
                    {buttonsData.map(({ title, onClick }) => (
                        <li key={title}>
                            <Button size="s" variant="clear" onClick={onClick}>
                                {title}
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
            <div className={s.calendar}>{children}</div>
        </CalendarContainer>
    );
};

const renderDayContents = (day: number) => {
    return <span>{day}</span>;
};

export const CustomDatePicker: FC<DatePickerProps> = (props) => {
    const { startDate, setStartDate, endDate, setEndDate, withPortal } = props;

    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    const months = useMemo(
        () => [
            t('Январь'),
            t('Февраль'),
            t('Март'),
            t('Апрель'),
            t('Май'),
            t('Июнь'),
            t('Июль'),
            t('Август'),
            t('Сентябрь'),
            t('Октябрь'),
            t('Ноябрь'),
            t('Декабрь'),
        ],
        [t],
    );

    const date = new Date();

    const setToday = () => {
        setStartDate(date);
        setEndDate(date);
    };

    const setYesterday = () => {
        const yesterday = new Date(date);
        yesterday.setDate(yesterday.getDate() - 1);
        setStartDate(yesterday);
        setEndDate(yesterday);
    };

    const setWeek = () => {
        const week = new Date(date);
        week.setDate(week.getDate() - 7);
        setStartDate(week);
        setEndDate(date);
    };

    const setMonth = () => {
        const month = new Date(date);
        month.setDate(month.getDate() - 30);
        setStartDate(month);
        setEndDate(date);
    };
    const setYear = () => {
        const year = new Date(date);
        year.setFullYear(year.getFullYear() - 1);
        setStartDate(year);
        setEndDate(date);
    };

    const setAllTime = () => {
        setStartDate(null);
        setEndDate(null);
    };

    const buttonsData = [
        {
            title: t('Сегодня'),
            onClick: setToday,
        },
        {
            title: t('Вчера'),
            onClick: setYesterday,
        },
        {
            title: t('7 дней'),
            onClick: setWeek,
        },
        {
            title: t('30 дней'),
            onClick: setMonth,
        },
        {
            title: t('Год'),
            onClick: setYear,
        },
        {
            title: t('Все время'),
            onClick: setAllTime,
        },
    ];

    const handleChange = (dates: any) => {
        const [start, end] = dates;
        setStartDate?.(start);
        setEndDate?.(end);
    };

    return (
        <div>
            {withPortal && (
                <>
                    <h5 className={s.label}>{t('Даты')}</h5>
                    <div className={s.tabs}>
                        {buttonsData.map(({ title, onClick }) => (
                            <button
                                key={title}
                                type="button"
                                className={s.tab}
                                onClick={onClick}
                            >
                                {title}
                            </button>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className={s.button}
                    >
                        {startDate ? (
                            <span>
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
                            </span>
                        ) : (
                            <span className={s.placeholder}>
                                {t('Диапазон дат')}
                            </span>
                        )}

                        <Calendar />
                    </button>
                </>
            )}
            {(!withPortal || open) && (
                <DatePicker
                    selected={startDate}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={handleChange}
                    inline={withPortal}
                    selectsRange
                    popperPlacement="bottom-start"
                    showPopperArrow={false}
                    calendarStartDay={1}
                    maxDate={new Date()}
                    dateFormat="dd.MM.yyyy"
                    placeholderText={t('Диапазон дат')}
                    calendarContainer={(props) => (
                        <MyContainer
                            withPortal={withPortal}
                            onClose={() => setOpen(false)}
                            buttonsData={buttonsData}
                            {...props}
                        />
                    )}
                    renderDayContents={renderDayContents}
                    renderCustomHeader={({
                        increaseMonth,
                        decreaseMonth,
                        date,
                    }) => (
                        <div className={s.header}>
                            <span
                                className={s.date}
                            >{`${months[date.getMonth()]} ${date.getFullYear()}`}</span>
                            <div className={s.actions}>
                                <IconButton
                                    icon={<ArrowLeft />}
                                    onClick={decreaseMonth}
                                />
                                <IconButton
                                    icon={<ArrowRight />}
                                    onClick={increaseMonth}
                                />
                            </div>
                        </div>
                    )}
                    customInput={
                        <Input
                            width="s"
                            addonRight={<Calendar className={s.icon} />}
                        />
                    }
                />
            )}
        </div>
    );
};
