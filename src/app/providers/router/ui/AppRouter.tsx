import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PageLoader } from '@/widgets/PageLoader';
import { routeConfig } from '../lib/routeConfig';
import { noAuthConfig } from '@/app/providers/router/lib/noAuthConfig';
import { useAppSelector } from '@/shared/lib/hooks/redux';
import { useGetUserDataQuery } from '@/entities/User';

const router = createBrowserRouter(routeConfig);
const noAuthRouter = createBrowserRouter(noAuthConfig);

const AppRouter = () => {
    const { isAuth, isAuthLoading } = useAppSelector((state) => state.app);
    const { isLoading } = useGetUserDataQuery();

    return (
        <Suspense fallback={<PageLoader />}>
            {isAuthLoading || isLoading ? (
                <PageLoader />
            ) : (
                <RouterProvider router={isAuth ? router : noAuthRouter} />
            )}
        </Suspense>
    );
};

export default AppRouter;
