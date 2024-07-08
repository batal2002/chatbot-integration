import classNames from 'classnames';
import { FC } from 'react';
import './Loader.scss';

interface LoaderProps {
    className?: string;
}

export const Loader: FC<LoaderProps> = (props) => {
    const { className } = props;

    return <span className={classNames('loader', {}, [className])} />;
};
