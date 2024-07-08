import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';
import { BottomNavigation } from '@/widgets/BottomNavigation';

const MainLayout: FC = () => {
    const { isMobile } = useScreenDetector();

    return (
        <>
            {isMobile && <BottomNavigation />}
            <Outlet />
        </>
    );
};

export default MainLayout;
