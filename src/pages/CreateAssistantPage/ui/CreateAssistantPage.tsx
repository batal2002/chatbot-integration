import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import s from './CreateAssistantPage.module.scss';
import { setCurrentPageTitle } from '@/app/model/slice/appSlice';
import { useAppDispatch } from '@/shared/lib/hooks/redux';
import { CreateAssistantForm } from '@/features/CreateAssistantForm';

export const CreateAssistantPage: FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setCurrentPageTitle(t('Создание ассистента')));
    }, [dispatch, t]);

    return (
        <div className={s.CreateAssistantPage}>
            <CreateAssistantForm />
        </div>
    );
};
