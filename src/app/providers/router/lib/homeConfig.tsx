import { Navigate, RouteObject } from 'react-router-dom';
import { AssistantsPage } from '@/pages/AssistantsPage';
import { TemplatesPage } from '@/pages/TemplatesPage';
import { TeamPage } from '@/pages/TeamPage';
import { AccountPage } from '@/pages/AccountPage';
import { CreateAssistantPage } from '@/pages/CreateAssistantPage';

export const homeConfig: RouteObject[] = [
    {
        path: '',
        element: <Navigate to="assistants" replace />,
    },
    {
        path: 'assistants',
        element: <AssistantsPage />,
    },
    {
        path: 'templates',
        element: <TemplatesPage />,
    },
    {
        path: 'team',
        element: <TeamPage />,
    },
    {
        path: 'account',
        element: <AccountPage />,
    },
    {
        path: 'create-assistant',
        element: <CreateAssistantPage />,
    },
];
