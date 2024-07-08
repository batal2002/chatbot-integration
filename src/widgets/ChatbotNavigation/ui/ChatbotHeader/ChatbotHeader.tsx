import classNames from 'classnames';
import { FC } from 'react';
import s from './ChatbotHeader.module.scss';
import Menu from '@/shared/assets/icons/text.svg';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux';
import { ChatbotSidebar } from '@/widgets/ChatbotNavigation/ui/ChatbotSidebar/ChatbotSidebar';
import { NavData } from '@/shared/model/types/navData';
import { setLeftSidebarIsOpen } from '@/app/model/slice/appSlice';

interface ChatbotHeaderProps {
    className?: string;
    navData: NavData[];
}

export const ChatbotHeader: FC<ChatbotHeaderProps> = (props) => {
    const { className, navData } = props;
    const dispatch = useAppDispatch();
    const { childrenPageTitle, currentPageTitle } = useAppSelector(
        (state) => state.app,
    );

    return (
        <div className={classNames(s.ChatbotHeader, {}, [className])}>
            <button
                type="button"
                className={s.menu}
                onClick={() => dispatch(setLeftSidebarIsOpen())}
            >
                <Menu />
            </button>
            <div className={s.breadcrumbs}>
                {currentPageTitle}
                {childrenPageTitle && `/${childrenPageTitle}`}
            </div>
            {/* TODO: Publish */}
            {/* <IconButton className={s.reset} icon={<Reset />} color="accent" /> */}
            <ChatbotSidebar navData={navData} />
        </div>
    );
};
