import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import s from './Avatar.module.scss';

type Size = 'xs' | 's' | 'm' | 'l';

interface AvatarProps {
    name?: string;
    size?: Size;
    image?: string;
    icon?: ReactNode;
}

export const Avatar: FC<AvatarProps> = (props) => {
    const { name, size = 'm', image, icon } = props;

    return (
        <div className={classNames(s.Avatar, {}, [s[size]])}>
            {icon ||
                (image ? (
                    <img className={s.image} src={image} alt="" />
                ) : (
                    name && name.charAt(0)
                ))}
        </div>
    );
};
