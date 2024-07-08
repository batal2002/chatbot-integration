import React, { FC, ReactNode } from 'react';
import s from './EntitiesList.module.scss';

interface AssistantsListProps {
    children: ReactNode;
    title?: string;
}

export const EntitiesList: FC<AssistantsListProps> = (props) => {
    const { children, title } = props;

    return (
        <>
            {title && <h4 className={s.title}>{title}</h4>}
            <div className={s.EntitiesList}>{children}</div>
        </>
    );
};
