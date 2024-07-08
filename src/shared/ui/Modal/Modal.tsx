import classNames from 'classnames';
import { FC, ReactNode, useCallback, useEffect } from 'react';
import Close from 'shared/assets/icons/close.svg';
import { IconButton } from '@/shared/ui/IconButton/IconButton';
import { Portal } from '@/shared/ui/Portal/Portal';
import s from './Modal.module.scss';
import { Overlay } from '@/shared/ui/Overlay/Overlay';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';

type Size = 'xs' | 's' | 'm' | 'l';

interface ModalProps {
    className?: string;
    classNameModal?: string;
    onClose: () => void;
    open: boolean;
    title?: string;
    children?: ReactNode;
    size?: Size;
}

export const Modal: FC<ModalProps> = (props) => {
    const {
        className,
        classNameModal,
        onClose,
        title,
        open,
        children,
        size = 'm',
    } = props;

    const { isMobile } = useScreenDetector();

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        },
        [onClose],
    );

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : 'auto';

        if (open) {
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [onKeyDown, open]);

    const mods = {
        [s.opened]: open,
    };

    return (
        <Portal>
            <div
                className={classNames(s.Modal, mods, [className])}
                onTouchMove={(e) => e.stopPropagation()}
            >
                <div
                    className={classNames(s.content, mods, [
                        classNameModal,
                        s[size],
                    ])}
                >
                    <IconButton
                        icon={<Close />}
                        onClick={onClose}
                        className={s.close}
                        size={isMobile ? 's' : 'm'}
                    />
                    {title && <h5 className={s.title}>{title}</h5>}
                    {children}
                </div>
                <Overlay onClose={onClose} />
            </div>
        </Portal>
    );
};
