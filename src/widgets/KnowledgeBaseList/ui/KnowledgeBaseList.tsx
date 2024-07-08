import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import s from './KnowledgeBaseList.module.scss';

interface KnowledgeBaseListProps {
    className?: string;
    title?: string;
    children: ReactNode;
}

export const KnowledgeBaseList: FC<KnowledgeBaseListProps> = (props) => {
    const { className, title, children } = props;

    return (
        <div className={classNames(s.KnowledgeBaseList, {}, [className])}>
            {title && <h4 className={s.title}>{title}</h4>}
            <ul className={s.list}>{children}</ul>
        </div>
    );
};
