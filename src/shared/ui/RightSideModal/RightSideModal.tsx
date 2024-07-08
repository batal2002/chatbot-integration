import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import { Portal } from '@/shared/ui/Portal/Portal';
import s from './RightSideModal.module.scss';
import { useSwipe } from '@/shared/lib/hooks/useSwipe';
import { useModal } from '@/shared/lib/hooks/useModal';
import Arrow from '@/shared/assets/icons/arrow-left.svg';

interface ModalProps {
    className?: string;
    onClose: () => void;
    open: boolean;
    children?: ReactNode;
    title?: string;
    withBottomNavigation?: boolean;
}

export const RightSideModal: FC<ModalProps> = (props) => {
    const { className, onClose, open, children, title, withBottomNavigation } =
        props;

    const { close, isClosing } = useModal({
        animationDelay: 200,
        isOpen: open,
        onClose,
    });

    const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe({
        onSwipedRight: () => close(),
    });

    const mods = {
        [s.isOpen]: open,
        [s.isClosing]: isClosing,
        [s.withBottomNavigation]: withBottomNavigation,
    };

    return (
        <Portal>
            <div
                className={classNames(s.chatbotModal, mods, [className])}
                onTouchStart={onTouchStart}
                onTouchMove={(e) => {
                    e.stopPropagation();
                    onTouchMove(e);
                }}
                onTouchEnd={onTouchEnd}
            >
                {title && (
                    <div className={s.header}>
                        <button
                            type="button"
                            onClick={close}
                            className={s.closeBtn}
                        >
                            <Arrow />
                        </button>
                        <h5 className={s.title}>{title}</h5>
                    </div>
                )}
                {children}
            </div>
        </Portal>
    );
};
