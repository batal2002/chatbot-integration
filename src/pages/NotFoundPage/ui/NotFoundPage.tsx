import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import NotFound from '@/shared/assets/images/notfound.svg';
import s from './NotFoundPage.module.scss';
import { HomeSidebar } from '@/widgets/HomeSidebar';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';
import { Header } from '@/widgets/Header';
import { setCurrentPageTitle } from '@/app/model/slice/appSlice';
import { useAppDispatch } from '@/shared/lib/hooks/redux';

export const NotFoundPage = () => {
    const { t } = useTranslation();
    const { isMobile } = useScreenDetector();

    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    useEffect(() => {
        dispatch(setCurrentPageTitle(t('Алина, добрый день')));
    }, [dispatch, t, pathname]);

    return (
        <>
            {isMobile && <Header />}
            <div className="page-container">
                {!isMobile && <HomeSidebar />}
                <div className="page-wrapper">
                    <div className={s.wrapper}>
                        <div className={s.info}>
                            <h3 className={s.title}>
                                {t('Упс, страница не найдена')}
                            </h3>
                            <span className={s.text}>
                                {t(
                                    'Но можно перейти к другим разделам в основном меню',
                                )}
                            </span>
                        </div>
                        <NotFound className={s.icon} />
                    </div>
                </div>
            </div>
        </>
    );
};
