import { Navigate, RouteObject } from 'react-router-dom';
import { GeneralPage } from '@/pages/GeneralPage';
import { FilesPage } from '@/pages/FilesPage';
import { IntegrationsPage } from '@/pages/IntegrationsPage';
import { ModelForm } from '@/features/ModelForm';

export const chatbotConfig: RouteObject[] = [
    {
        path: 'settings',
        element: <Navigate to="general" replace />,
    },
    {
        path: 'settings/general',
        element: <GeneralPage />,
    },
    {
        path: 'settings/model',
        element: <ModelForm />,
    },

    // TODO: Interface
    // {
    //     path: 'settings/interface',
    //     element: <InterfaceForm />,
    // },

    // TODO: Dashboard
    // {
    //     path: 'dashboard',
    //     element: <Navigate to="logs" replace />,
    // },
    // {
    //     path: 'dashboard/logs',
    //     element: <LogsPage />,
    // },
    // {
    //     path: 'dashboard/logs/:logsId',
    //     element: <LogsPage />,
    // },
    // {
    //     path: 'dashboard/inbox',
    //     element: <InboxPage />,
    // },
    // {
    //     path: 'dashboard/inbox/:inboxId',
    //     element: <InboxPage />,
    // },

    {
        path: 'knowledgebase',
        element: <Navigate to="files" replace />,
    },
    {
        path: 'knowledgebase/files',
        element: <FilesPage />,
    },
    // TODO: datasets
    // {
    //     path: 'knowledgebase/text',
    //     element: <TextPage />,
    // },
    // {
    //     path: 'knowledgebase/websites',
    //     element: <WebsitesPage />,
    // },

    {
        path: 'integrations',
        element: <IntegrationsPage />,
    },
    // TODO: API
    // {
    //     path: 'api',
    //     element: <Navigate to="project" replace />,
    // },
    // {
    //     path: 'api/project',
    //     element: <ApiProjectPage />,
    // },
    // {
    //     path: 'api/dialog',
    //     element: <ApiDialogPage />,
    // },
    // {
    //     path: 'api/knowledgebase',
    //     element: <ApiKnowledgeBasePage />,
    // },

    {
        path: '',
        element: <Navigate to="settings/general" replace />,
    },
];
