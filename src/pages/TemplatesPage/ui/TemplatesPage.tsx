import React, { FC } from 'react';
import { TemplatesHeader } from '@/widgets/TemplatesHeader';
import s from './TemplatesPage.module.scss';
import { TemplatesList } from '@/widgets/TemplatesList';

export const TemplatesPage: FC = () => (
    <div className={s.TemplatesPage}>
        <TemplatesHeader />
        <TemplatesList />
    </div>
);
