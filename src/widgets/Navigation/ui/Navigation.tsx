import classNames from 'classnames';
import { FC, useCallback, useEffect, useState } from 'react';
import s from './Navigation.module.scss';
import { NavData } from '@/shared/model/types/navData';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux';
import {
    setChildrenPageTitle,
    setCurrentPageTitle,
} from '@/app/model/slice/appSlice';
import { Sidebar } from '@/shared/ui/Sidebar/Sidebar';

interface NavigationProps {
    navData: NavData[];
}

export const Navigation: FC<NavigationProps> = (props) => {
    const { navData } = props;
    const dispatch = useAppDispatch();
    const { currentPageTitle } = useAppSelector((state) => state.app);
    const [currentPage, setCurrentPage] = useState<NavData | null>(null);

    useEffect(() => {
        return () => {
            dispatch(setChildrenPageTitle(''));
            dispatch(setCurrentPageTitle(''));
        };
    }, [dispatch]);

    const onActive = useCallback(
        (index: number) => {
            dispatch(setCurrentPageTitle(navData[index].title));
            if (!navData[index].children) {
                dispatch(setChildrenPageTitle(''));
            }
            setCurrentPage(navData[index]);
        },
        [dispatch, navData],
    );

    const onChildrenActive = useCallback(
        (index: number) => {
            if (currentPage?.children) {
                dispatch(
                    setChildrenPageTitle(currentPage?.children[index].title),
                );
            }
        },
        [currentPage?.children, dispatch],
    );

    return (
        <div className={classNames(s.Navigation, {}, [])}>
            <Sidebar navData={navData} onActive={onActive} fixed />
            {currentPage?.children && (
                <Sidebar
                    headerText={currentPageTitle}
                    navData={currentPage?.children}
                    onActive={onChildrenActive}
                />
            )}
        </div>
    );
};
