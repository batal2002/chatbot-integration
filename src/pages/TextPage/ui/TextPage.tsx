import { FC } from 'react';
import s from './TextPage.module.scss';
import { KnowledgeBaseBlock } from '@/widgets/KnowledgeBaseBlock';
import { TextForm } from '@/features/TextForm';

export const TextPage: FC = () => {
    return (
        <div className={s.TextPage}>
            <TextForm formId="textForm" />
            <KnowledgeBaseBlock formId="textForm" />
        </div>
    );
};
