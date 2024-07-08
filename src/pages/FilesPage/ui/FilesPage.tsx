import { FC } from 'react';
import s from './FilesPage.module.scss';
import { FilesForm } from '@/features/FilesForm';

export const FilesPage: FC = () => (
    <div className={s.FilesPage}>
        <FilesForm />
    </div>
);
