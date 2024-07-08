import { FC } from 'react';
import s from './WebsitesPage.module.scss';
import { WebsitesForm } from '@/features/WebsitesForm';
import { KnowledgeBaseBlock } from '@/widgets/KnowledgeBaseBlock';

export const WebsitesPage: FC = () => {
    return (
        <div className={s.WebsitesPage}>
            <WebsitesForm />
            <KnowledgeBaseBlock />
        </div>
    );
};
