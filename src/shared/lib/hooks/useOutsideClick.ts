import { MutableRefObject, useEffect, useRef } from 'react';

export interface useOutsideClickOptions {
    onClose: () => void;
    open: boolean;
}

export const useOutsideClick = ({ open, onClose }: useOutsideClickOptions) => {
    const ref = useRef() as MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const { target } = event;
            if (target instanceof Node && !ref.current?.contains(target)) {
                onClose();
            }
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [onClose, open, ref]);

    return ref;
};
