import classNames from 'classnames';
import { FC } from 'react';
import s from './Overlay.module.scss';

interface OverlayProps {
    className?: string;
    onClose: () => void;
    isOpen?: boolean;
    isClosing?: boolean;
}

export const Overlay: FC<OverlayProps> = (props) => {
    const { className, onClose, isOpen, isClosing } = props;

    const mods = {
        [s.isOpen]: isOpen,
        [s.isClose]: isOpen === false,
        [s.isClosing]: isClosing,
    };
    return (
        <div
            className={classNames(s.Overlay, mods, [className])}
            onClick={onClose}
        />
    );
};
