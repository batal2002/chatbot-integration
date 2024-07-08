import { Navigate, RouteObject } from 'react-router-dom';
import { LoginPage } from '@/pages/LoginPage';
import { RegistrationPage } from '@/pages/RegistrationPage';
import { RecoveryPage } from '@/pages/RecoveryPage';
import { ChangePasswordPage } from '@/pages/ChangePasswordPage';

export const noAuthConfig: RouteObject[] = [
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/registration',
        element: <RegistrationPage />,
    },
    {
        path: '/recovery',
        element: <RecoveryPage />,
    },
    {
        path: '/password_reset_confirm',
        element: <ChangePasswordPage />,
    },
    {
        path: '*',
        element: <Navigate to="/login" replace />,
    },
];
