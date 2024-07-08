import { Navigate, RouteObject } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ChatbotPage } from '@/pages/ChatbotPage';
import { homeConfig } from '@/app/providers/router/lib/homeConfig';
import { chatbotConfig } from '@/app/providers/router/lib/chatbotConfig';
import { MainLayout } from '@/pages/MainLayout';

export const routeConfig: RouteObject[] = [
    {
        path: '/login',
        element: <Navigate to="/" replace />,
    },
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
                children: homeConfig,
            },
            {
                path: '/chatbot/:chatbotId',
                element: <ChatbotPage />,
                children: chatbotConfig,
            },

            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
];
