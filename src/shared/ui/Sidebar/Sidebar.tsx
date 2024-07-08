import classNames from 'classnames';
import ArrowIcon from 'shared/assets/icons/arrow-left.svg';
import { memo, useState } from 'react';
import { SidebarLink } from '@/shared/ui/SidebarLink/SidebarLink';
import { Logo } from '@/shared/ui/Logo/Logo';
import s from './Sidebar.module.scss';
import { NavData } from '@/shared/model/types/navData';

interface SidebarProps {
    headerText?: string;
    navData: NavData[];
    extraNavData?: NavData[];
    fixed?: boolean;
    onActive?: (index: number) => void;
}

export const Sidebar = memo((props: SidebarProps) => {
    const {
        headerText,
        navData,
        fixed = false,
        extraNavData,
        onActive,
    } = props;

    const [collapsed, setCollapsed] = useState<boolean>(fixed);

    const mods = {
        [s.collapsed]: collapsed,
    };

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className={classNames(s.Sidebar, mods, [])}>
            <div className={s.header}>
                {headerText ? (
                    <h4 className={s.title}>{headerText}</h4>
                ) : (
                    <Logo collapsed={collapsed} />
                )}
            </div>

            <nav className={s.body}>
                {navData.map(({ to, icon, title, soon }, index) => (
                    <SidebarLink
                        key={to}
                        collapsed={collapsed}
                        icon={icon}
                        to={to}
                        soon={soon}
                        onActive={() => onActive?.(index)}
                    >
                        {title}
                    </SidebarLink>
                ))}
                {extraNavData && (
                    <>
                        <div className={s.line} />
                        {extraNavData?.map(({ to, icon, title, soon }) => (
                            <SidebarLink
                                key={to}
                                collapsed={collapsed}
                                icon={icon}
                                to={to}
                                soon={soon}
                            >
                                {title}
                            </SidebarLink>
                        ))}
                    </>
                )}
            </nav>
            {!fixed && (
                <button
                    type="button"
                    className={s.arrow}
                    onClick={toggleSidebar}
                >
                    <ArrowIcon />
                </button>
            )}
        </div>
    );
});
