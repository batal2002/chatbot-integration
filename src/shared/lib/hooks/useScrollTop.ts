import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollTop = (target: HTMLElement | null) => {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        if (target) {
            target.scrollTo(0, 0);
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname, target]);
};
