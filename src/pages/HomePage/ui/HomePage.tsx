import React, { Suspense, useCallback, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { PageLoader } from '@/widgets/PageLoader';
import { Header } from '@/widgets/Header';
import { HomeSidebar } from '@/widgets/HomeSidebar';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';
import { useScrollTop } from '@/shared/lib/hooks/useScrollTop';

const HomePage = () => {
    const { isMobile } = useScreenDetector();
    const container = useRef<HTMLDivElement | null>(null);

    useScrollTop(isMobile ? null : container.current);
    const navigate = useNavigate();
    const headerButtonOnClick = useCallback(
        () => navigate('create-assistant'),
        [navigate],
    );

    return (
        <div className="page-container">
            {!isMobile && <HomeSidebar />}
            <div className="page-wrapper">
                <Header onClick={headerButtonOnClick} />
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
export default HomePage;
