import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Button } from '@/shared/ui/Button/Button';
import s from './Header.module.scss';
import {
    DropdownList,
    DropdownListData,
} from '@/shared/ui/DropdownList/DropdownList';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux';
import { setIsAuth } from '@/app/model/slice/appSlice';
import { useGetUserDataQuery } from '@/entities/User';

interface HeaderProps {
    className?: string;
    onClick?: () => void;
    buttonText?: string;
    notifications?: boolean;
}

export const Header: FC<HeaderProps> = (props) => {
    const { className, onClick, buttonText, notifications = true } = props;

    const { data } = useGetUserDataQuery();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [, , removeCookie] = useCookies();
    const { isMobile } = useScreenDetector();
    const dispatch = useAppDispatch();
    const { childrenPageTitle, currentPageTitle } = useAppSelector(
        (state) => state.app,
    );
    const dropdownData: DropdownListData[] = useMemo(
        () => [
            {
                label: t('Аккаунт'),
                onClick: () => navigate('/account'),
            },
            {
                label: t('Выйти'),
                onClick: () => {
                    dispatch(setIsAuth(false));
                    removeCookie('access');
                    removeCookie('refresh');
                    navigate('/login');
                },
            },
        ],
        [dispatch, navigate, removeCookie, t],
    );

    return (
        <div className={classNames(s.Header, {}, [className])}>
            <h2 className={s.title}>{childrenPageTitle || currentPageTitle}</h2>

            <div className={s.actions}>
                {/* TODO: notifications */}
                {/* {notifications && ( */}
                {/*     <IconButton icon={<Notifications />} iconColor="dark" /> */}
                {/* )} */}
                {isMobile ? (
                    <Button
                        variant="clear"
                        onClick={() => navigate('/account')}
                    >
                        <Avatar size="s" name={data?.first_name} />
                    </Button>
                ) : (
                    <DropdownList data={dropdownData}>
                        <Button variant="clear">
                            <Avatar size="s" name={data?.first_name} />
                        </Button>
                    </DropdownList>
                )}
                {/* TODO: Publish */}
                {!isMobile && !buttonText && (
                    <Button onClick={onClick}>
                        {buttonText || t('Создать ассистента')}
                    </Button>
                )}
            </div>
        </div>
    );
};
