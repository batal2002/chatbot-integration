import classNames from 'classnames';
import { FC } from 'react';
import ReactSlider from 'react-slider';
import s from './InputRange.module.scss';
import { Tooltip, TooltipPosition } from '@/shared/ui/Tooltip/Tooltip';

interface InputRangeProps {
    className?: string;
    value: number;
    onChange: (value: number | number[]) => void;
    min?: number;
    max?: number;
    step?: number;
    label?: string;
    minLabel?: string;
    maxLabel?: string;
    tooltipText?: string;
    isPercent?: boolean;
    tooltipPosition?: TooltipPosition;
}

export const InputRange: FC<InputRangeProps> = (props) => {
    const {
        className,
        label,
        onChange,
        min = 0,
        max = 100,
        value,
        minLabel,
        maxLabel,
        tooltipText,
        step = max / 100,
        isPercent,
        tooltipPosition,
    } = props;

    return (
        <div className={classNames(s.InputRange, {}, [className])}>
            <div className={s.header}>
                {label && <span className={s.label}>{label}</span>}
                {tooltipText && (
                    <Tooltip text={tooltipText} position={tooltipPosition} />
                )}
            </div>
            <div
                className={s.wrapper}
                onTouchStart={(e) => e.stopPropagation()}
            >
                <span>
                    {value}
                    {isPercent && '%'}
                </span>
                <ReactSlider
                    value={value}
                    onChange={onChange}
                    min={min}
                    max={max}
                    step={step}
                    className={s.input}
                    thumbClassName={s.thumb}
                    trackClassName={`${s.track} track`}
                />
                {minLabel && maxLabel && (
                    <div className={s.tags}>
                        <span>{minLabel}</span>
                        <span>{maxLabel}</span>
                    </div>
                )}
            </div>
        </div>
    );
};
