import classNames from 'classnames';
import { FC, ReactNode, useEffect } from 'react';
import { NavLink, NavLinkProps, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import s from './SidebarLink.module.scss';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';

interface SidebarLinkProps extends NavLinkProps {
    className?: string;
    icon?: ReactNode;
    collapsed?: boolean;
    children: string;
    onActive?: () => void;
    to: string;
    isClear?: boolean;
    soon?: boolean;
}

export const SidebarLink: FC<SidebarLinkProps> = (props) => {
    const {
        to,
        className,
        children,
        icon,
        collapsed,
        onActive,
        isClear,
        soon,
        ...otherProps
    } = props;
    const { pathname } = useLocation();
    const { t } = useTranslation();
    const { isMobile } = useScreenDetector();
    useEffect(() => {
        if (pathname.includes(to) && onActive) {
            onActive();
        }
    }, [onActive, pathname, to]);

    const mods = {
        [s.collapsed]: collapsed,
        [s.clear]: isClear,
        [s.soon]: soon,
    };

    return (
        <div className={s.wrapper}>
            <NavLink
                to={to}
                className={({ isActive }) =>
                    classNames(
                        s.SidebarLink,
                        { ...mods, [s.active]: isActive },
                        [className],
                    )
                }
                {...otherProps}
            >
                {icon}
                {!isClear && <span className={s.span}>{children}</span>}
            </NavLink>

            {soon && !collapsed && !isMobile && (
                <span className={s.soonTag}>{t('Скоро')}</span>
            )}
            {collapsed && !isClear && (
                <span className={s.tooltip}>
                    {soon ? t('Скоро') : children}
                </span>
            )}
        </div>
    );
};
