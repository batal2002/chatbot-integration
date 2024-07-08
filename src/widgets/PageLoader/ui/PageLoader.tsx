import classNames from 'classnames';
import { FC } from 'react';
import { Loader } from '@/shared/ui/Loader/Loader';
import s from './PageLoader.module.scss';

type Size = 'full' | 'child';

interface PageLoaderProps {
    size?: Size;
}

export const PageLoader: FC<PageLoaderProps> = (props) => {
    const { size = 'full' } = props;

    return (
        <div className={classNames(s.PageLoader, {}, [s[size]])}>
            <Loader />
        </div>
    );
};
