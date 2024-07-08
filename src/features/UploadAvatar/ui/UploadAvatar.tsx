import classNames from 'classnames';
import { FC, FormEvent, useState } from 'react';
import s from './UploadAvatar.module.scss';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { useGetUserDataQuery } from '@/entities/User';

interface UploadAvatarProps {
    className?: string;
}

export const UploadAvatar: FC<UploadAvatarProps> = (props) => {
    const { className } = props;

    const { data } = useGetUserDataQuery();
    const [avatar, setAvatar] = useState<File | undefined>();

    const onChange = (e: FormEvent<HTMLInputElement>) => {
        setAvatar(e.currentTarget.files?.[0]);
    };

    return (
        <label className={classNames(s.UploadAvatar, {}, [className])}>
            <Avatar size="l" name={data?.first_name} />
            {/* TODO: UploadAvatar */}
            <input
                disabled
                className={s.input}
                type="file"
                accept={'image/*'}
                onChange={onChange}
            />
        </label>
    );
};
