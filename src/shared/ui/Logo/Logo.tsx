import classNames from 'classnames';
import LogoIcon from 'shared/assets/icons/logo.svg';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import s from './Logo.module.scss';

interface LogoProps {
    className?: string;
    collapsed?: boolean;
}

export const Logo: FC<LogoProps> = ({ className, collapsed }) => {
    const mods = {
        [s.collapsed]: collapsed,
    };

    return (
        <Link to="/" className={classNames(s.Logo, mods, [className])}>
            <LogoIcon className={s.image} />
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <span className={s.title}>RunBotAi</span>
        </Link>
    );
};
