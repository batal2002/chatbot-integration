import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Dashboard from '@/shared/assets/icons/dashboard.svg';
import Template from '@/shared/assets/icons/template.svg';
import Team from '@/shared/assets/icons/team.svg';
import Help from '@/shared/assets/icons/help.svg';
import Settings from '@/shared/assets/icons/settings.svg';
import { NavData } from '@/shared/model/types/navData';
import { Sidebar } from '@/shared/ui/Sidebar/Sidebar';
import {
    setChildrenPageTitle,
    setCurrentPageTitle,
} from '@/app/model/slice/appSlice';
import { useAppDispatch } from '@/shared/lib/hooks/redux';

export const HomeSidebar = () => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const navData = useMemo(
        (): NavData[] => [
            {
                to: '/assistants',
                icon: <Dashboard />,
                title: t('Ассистенты'),
            },
            {
                to: '/templates',
                icon: <Template />,
                title: t('Шаблоны'),
                soon: true,
            },
            {
                to: '/team',
                icon: <Team />,
                title: t('Команда'),
                soon: true,
            },
        ],
        [t],
    );
    const extraNavData = useMemo(
        (): NavData[] => [
            {
                to: '/help',
                icon: <Help />,
                title: t('Помощь'),
                soon: true,
            },
            {
                to: '/settings',
                icon: <Settings />,
                title: t('Настройки'),
                soon: true,
            },
        ],
        [t],
    );
    useEffect(() => {
        return () => {
            dispatch(setChildrenPageTitle(''));
            dispatch(setCurrentPageTitle(''));
        };
    }, []);

    const onActive = useCallback(
        (index: number) => {
            dispatch(setCurrentPageTitle(navData[index].title));
        },
        [dispatch, navData],
    );

    return (
        <Sidebar
            navData={navData}
            extraNavData={extraNavData}
            onActive={onActive}
        />
    );
};
