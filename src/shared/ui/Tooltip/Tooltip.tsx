import classNames from 'classnames';
import { FC, useState } from 'react';
import TooltipIcon from '@/shared/assets/icons/tooltip.svg';
import s from './Tooltip.module.scss';
import { useOutsideClick } from '@/shared/lib/hooks/useOutsideClick';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

interface TooltipProps {
    className?: string;
    text: string;
    position?: TooltipPosition;
}

export const Tooltip: FC<TooltipProps> = (props) => {
    const { className, text, position = 'top' } = props;
    const { isMobile } = useScreenDetector();
    const [open, setOpen] = useState(false);
    const ref = useOutsideClick({ open, onClose: () => setOpen(false) });

    return (
        <div
            className={classNames(s.Tooltip, {}, [className, s[position]])}
            ref={ref}
        >
            {isMobile ? (
                <button type="button" onClick={() => setOpen(true)}>
                    <TooltipIcon className={s.icon} />
                </button>
            ) : (
                <TooltipIcon className={s.icon} />
            )}
            <span className={classNames(s.tooltip, { [s.open]: open })}>
                {text}
            </span>
        </div>
    );
};
