import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import { Portal } from '@/shared/ui/Portal/Portal';
import s from './SwipedModal.module.scss';
import { Overlay } from '@/shared/ui/Overlay/Overlay';
import { useSwipe } from '@/shared/lib/hooks/useSwipe';
import { useModal } from '@/shared/lib/hooks/useModal';

interface ModalProps {
    className?: string;
    classNameModal?: string;
    onClose: () => void;
    open: boolean;
    children?: ReactNode;
}

export const SwipedModal: FC<ModalProps> = (props) => {
    const { className, classNameModal, onClose, open, children } = props;

    const { close, isClosing } = useModal({
        animationDelay: 200,
        isOpen: open,
        onClose,
    });

    const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe({
        onSwipedBottom: () => close(),
    });

    const mods = {
        [s.isOpen]: open,
        [s.isClosing]: isClosing,
    };

    return (
        <Portal>
            <div
                className={classNames(s.Modal, mods, [className])}
                onTouchStart={onTouchStart}
                onTouchMove={(e) => {
                    e.stopPropagation();
                    onTouchMove(e);
                }}
                onTouchEnd={onTouchEnd}
            >
                <div className={classNames(s.popup, {}, [classNameModal])}>
                    <button type="button" className={s.close} onClick={close}>
                        <div className={s.closeHandler} />
                    </button>
                    {children}
                </div>
                <Overlay onClose={close} isOpen={open} isClosing={isClosing} />
            </div>
        </Portal>
    );
};
