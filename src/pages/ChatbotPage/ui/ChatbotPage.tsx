import React, { Suspense, useEffect, useMemo, useRef } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { PageLoader } from '@/widgets/PageLoader';
import Settings from '@/shared/assets/icons/settings.svg';
import Dashboard from '@/shared/assets/icons/dashboard.svg';
import Database from '@/shared/assets/icons/database.svg';
import Integrations from '@/shared/assets/icons/integrations.svg';
import Api from '@/shared/assets/icons/api.svg';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';
import { NavData } from '@/shared/model/types/navData';
import Bot from '@/shared/assets/icons/bot.svg';
import Star from '@/shared/assets/icons/star.svg';
import Swap from '@/shared/assets/icons/swap.svg';
import Edit from '@/shared/assets/icons/edit.svg';
import Analytics from '@/shared/assets/icons/analytics.svg';
import Inbox from '@/shared/assets/icons/inbox.svg';
import Files from '@/shared/assets/icons/files.svg';
import Text from '@/shared/assets/icons/text.svg';
import Websites from '@/shared/assets/icons/websites.svg';
import Project from '@/shared/assets/icons/api_project.svg';
import Dialog from '@/shared/assets/icons/api_dialog.svg';
import Base from '@/shared/assets/icons/api_base.svg';
import { Header } from '@/widgets/Header';
import { Navigation } from '@/widgets/Navigation';
import { ChatbotHeader } from '@/widgets/ChatbotNavigation';
import { useSwipe } from '@/shared/lib/hooks/useSwipe';
import { useAppDispatch } from '@/shared/lib/hooks/redux';
import {
    setLeftSidebarIsClose,
    setLeftSidebarIsOpen,
} from '@/app/model/slice/appSlice';
import { useScrollTop } from '@/shared/lib/hooks/useScrollTop';
import { useGetAssistantDataQuery } from '@/entities/Assistant';

const ChatbotPage = () => {
    const { t } = useTranslation();
    const { isMobile } = useScreenDetector();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe({
        onSwipedRight: () => dispatch(setLeftSidebarIsOpen()),
    });
    const container = useRef<HTMLDivElement | null>(null);
    const { chatbotId } = useParams();
    const { error } = useGetAssistantDataQuery(chatbotId);
    useScrollTop(isMobile ? null : container.current);

    useEffect(() => {
        return () => {
            dispatch(setLeftSidebarIsClose());
        };
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            if ('status' in error && error.status === 404) {
                navigate('/404', { replace: true });
            }
        }
    }, [error, navigate]);

    const navData = useMemo(
        (): NavData[] => [
            {
                to: 'settings',
                icon: <Settings />,
                title: t('Настройки'),
                children: [
                    {
                        to: 'settings/general',
                        icon: <Bot />,
                        title: t('Чатбот'),
                    },
                    {
                        to: 'settings/model',
                        icon: <Star />,
                        title: t('Модель ИИ'),
                    },
                    {
                        to: 'settings/interface',
                        icon: <Edit />,
                        title: t('Интерфейс'),
                        soon: true,
                    },
                ],
            },
            {
                to: 'dashboard',
                icon: <Dashboard />,
                title: t('Дашборд'),
                soon: true,
                children: [
                    {
                        to: 'dashboard/logs',
                        icon: <Swap />,
                        title: t('Логи чатбота'),
                    },
                    {
                        to: 'dashboard/analytics',
                        icon: <Analytics />,
                        title: t('Аналитика'),
                    },
                    {
                        to: 'dashboard/inbox',
                        icon: <Inbox />,
                        title: t('Входящие'),
                    },
                ],
            },
            {
                to: 'knowledgebase',
                icon: <Database />,
                title: t('База знаний'),
                children: [
                    {
                        to: 'knowledgebase/files',
                        icon: <Files />,
                        title: t('Файлы'),
                    },
                    {
                        to: 'knowledgebase/text',
                        icon: <Text />,
                        title: t('Текст'),
                        soon: true,
                    },
                    {
                        to: 'knowledgebase/websites',
                        icon: <Websites />,
                        title: t('Сайты'),
                        soon: true,
                    },
                ],
            },
            {
                to: 'integrations',
                icon: <Integrations />,
                title: t('Интеграции'),
            },
            {
                to: 'api',
                icon: <Api />,
                title: 'API',
                soon: true,
                children: [
                    {
                        to: 'api/project',
                        icon: <Project />,
                        title: t('API проекта'),
                    },
                    {
                        to: 'api/dialog',
                        icon: <Dialog />,
                        title: t('API диалога'),
                    },
                    {
                        to: 'api/knowledgebase',
                        icon: <Base />,
                        title: t('API базы знаний'),
                    },
                ],
            },
        ],
        [t],
    );

    return (
        <div
            className="page-container"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {isMobile ? (
                <ChatbotHeader navData={navData} />
            ) : (
                <Navigation navData={navData} />
            )}
            <div className="page-wrapper">
                {!isMobile && (
                    <Header
                        notifications={false}
                        buttonText={t('Опубликовать')}
                    />
                )}

                <div className="page-body-wrapper" ref={container}>
                    <div className="page-body">
                        <Suspense fallback={<PageLoader size="child" />}>
                            <Outlet />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ChatbotPage;
