import classNames from 'classnames';
import React, { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SidebarLink } from '@/shared/ui/SidebarLink/SidebarLink';
import s from './BottomNavigation.module.scss';
import { NavData } from '@/shared/model/types/navData';
import { setCurrentPageTitle } from '@/app/model/slice/appSlice';
import { useAppDispatch } from '@/shared/lib/hooks/redux';
import Dashboard from '@/shared/assets/icons/dashboard.svg';
import Template from '@/shared/assets/icons/template.svg';
import Team from '@/shared/assets/icons/team.svg';
import Help from '@/shared/assets/icons/help.svg';
import Settings from '@/shared/assets/icons/settings.svg';

export const BottomNavigation = memo(() => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const navData = useMemo(
        (): NavData[] => [
            {
                to: 'assistants',
                icon: <Dashboard />,
                title: t('Ассистенты'),
            },
            {
                to: 'templates',
                icon: <Template />,
                title: t('Шаблоны'),
                soon: true,
            },
            {
                to: 'team',
                icon: <Team />,
                title: t('Команда'),
                soon: true,
            },
            {
                to: 'help',
                icon: <Help />,
                title: t('Помощь'),
                soon: true,
            },
            {
                to: 'settings',
                icon: <Settings />,
                title: t('Настройки'),
                soon: true,
            },
        ],
        [t],
    );

    const onActive = useCallback(
        (index: number) => {
            dispatch(setCurrentPageTitle(navData[index].title));
        },
        [dispatch, navData],
    );

    return (
        <nav className={classNames(s.BottomNavigation, {}, [])}>
            {navData.map(({ to, icon, title, soon }, index) => (
                <SidebarLink
                    key={to}
                    icon={icon}
                    to={to}
                    onActive={() => onActive(index)}
                    soon={soon}
                    isClear
                >
                    {title}
                </SidebarLink>
            ))}
        </nav>
    );
});
