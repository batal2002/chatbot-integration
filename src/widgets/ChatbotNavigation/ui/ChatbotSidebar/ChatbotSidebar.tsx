import classNames from 'classnames';
import { FC, useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import s from './ChatbotSidebar.module.scss';
import { NavData } from '@/shared/model/types/navData';
import { Portal } from '@/shared/ui/Portal/Portal';
import { Overlay } from '@/shared/ui/Overlay/Overlay';
import { useModal } from '@/shared/lib/hooks/useModal';
import { useSwipe } from '@/shared/lib/hooks/useSwipe';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux';
import {
    setChildrenPageTitle,
    setCurrentPageTitle,
    setLeftSidebarIsClose,
} from '@/app/model/slice/appSlice';
import { SidebarLink } from '@/shared/ui/SidebarLink/SidebarLink';
import Arrow from '@/shared/assets/icons/arrow-down.svg';
import { Logo } from '@/shared/ui/Logo/Logo';
import { useGetAssistantDataQuery } from '@/entities/Assistant';
import { OverflowText } from '@/shared/ui/OverflowText/OverflowText';

interface ChatbotSidebarProps {
    navData: NavData[];
}

export const ChatbotSidebar: FC<ChatbotSidebarProps> = (props) => {
    const { navData } = props;
    const dispatch = useAppDispatch();
    const { sidebarIsOpen } = useAppSelector((state) => state.app);
    const { pathname } = useLocation();
    const { close, isClosing } = useModal({
        animationDelay: 200,
        isOpen: sidebarIsOpen,
        onClose: () => dispatch(setLeftSidebarIsClose()),
    });
    const { chatbotId } = useParams();
    const { data: assistantData } = useGetAssistantDataQuery(chatbotId);
    const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe({
        onSwipedLeft: close,
    });

    const [openTo, setOpenTo] = useState<string | null>(null);

    const openDropdown = (to: string) => {
        setOpenTo((prevState) => (prevState === to ? null : to));
    };

    useEffect(() => {
        return () => {
            dispatch(setChildrenPageTitle(''));
            dispatch(setCurrentPageTitle(''));
        };
    }, [dispatch]);

    useEffect(() => {
        navData.forEach((data) => {
            if (pathname.includes(data.to)) {
                setOpenTo(data.to);
            }
        });
    }, [navData, pathname, sidebarIsOpen]);
    console.log(navData);
    useEffect(() => {
        close();
    }, [pathname]);

    const mods = {
        [s.isOpen]: sidebarIsOpen,
        [s.isClosing]: isClosing,
    };

    const onActive = useCallback(
        (parentTitle: string, childrenTitle?: string) => {
            dispatch(setCurrentPageTitle(parentTitle));
            if (childrenTitle) {
                dispatch(setChildrenPageTitle(childrenTitle));
            } else {
                dispatch(setChildrenPageTitle(''));
            }
        },
        [dispatch],
    );

    return (
        <Portal>
            <div
                className={classNames(s.ChatbotSidebar, mods)}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div className={s.sidebar}>
                    <OverflowText className={s.name}>
                        {assistantData && assistantData.name}
                    </OverflowText>
                    <nav className={s.nav}>
                        {navData.map(
                            ({
                                to,
                                title: parentTitle,
                                icon,
                                children,
                                soon,
                            }) =>
                                children ? (
                                    <div
                                        key={to}
                                        className={classNames(s.wrapper, {
                                            [s.open]: openTo === to,
                                        })}
                                    >
                                        <button
                                            type="button"
                                            className={s.button}
                                            disabled={soon}
                                            onClick={() => openDropdown(to)}
                                        >
                                            {icon}
                                            {parentTitle}
                                            <Arrow className={s.arrow} />
                                        </button>
                                        <div className={s.dropdown}>
                                            {children?.map(
                                                ({ to, title, icon, soon }) => (
                                                    <SidebarLink
                                                        key={to}
                                                        to={to}
                                                        icon={icon}
                                                        soon={soon}
                                                        onActive={() =>
                                                            onActive(
                                                                parentTitle,
                                                                title,
                                                            )
                                                        }
                                                    >
                                                        {title}
                                                    </SidebarLink>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <SidebarLink
                                        to={to}
                                        icon={icon}
                                        key={to}
                                        onActive={() => onActive(parentTitle)}
                                    >
                                        {parentTitle}
                                    </SidebarLink>
                                ),
                        )}
                    </nav>
                    <Logo className={s.logo} />
                </div>
                <Overlay
                    onClose={close}
                    isClosing={isClosing}
                    isOpen={sidebarIsOpen}
                />
            </div>
        </Portal>
    );
};
