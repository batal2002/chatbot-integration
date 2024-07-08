import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { EntitiesList } from '@/shared/ui/EntitiesList/EntitiesList';
import s from './AssistantsPage.module.scss';
import { AssistantsCard } from '@/entities/AssistantsCard';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';
import Add from '@/shared/assets/icons/close.svg';
import { PageLoader } from '@/widgets/PageLoader';
import { useGetAssistantsDataQuery } from '@/entities/Assistant';
import { setCurrentPageTitle } from '@/app/model/slice/appSlice';
import { useAppDispatch } from '@/shared/lib/hooks/redux';
import { useGetUserDataQuery } from '@/entities/User';

const dataTemplates = [
    {
        id: 0,
        name: 'Название ассистента',
        description: 'Краткое описание',
    },
    {
        id: 1,
        name: 'Название ассистента 2',
        description: 'Чат бот для поддержки на сайте ',
    },
];

export const AssistantsPage = () => {
    const { t } = useTranslation();
    const { isMobile } = useScreenDetector();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { data: userData } = useGetUserDataQuery();
    const { data, isLoading, error } = useGetAssistantsDataQuery();

    useEffect(() => {
        if (userData) {
            dispatch(
                setCurrentPageTitle(t(`${userData.first_name}, добрый день`)),
            );
        }
    }, [dispatch, t]);

    if (isLoading) return <PageLoader size="child" />;

    return (
        <div>
            {/* TODO: Filters */}
            {/* <AssistantsHeader /> */}
            <EntitiesList>
                {isMobile && (
                    <button
                        type="button"
                        className={s.add}
                        onClick={() => navigate('/create-assistant')}
                    >
                        <Add className={s.addIcon} />
                        <span className={s.addTitle}>
                            {t('Новый ассистент')}
                        </span>
                    </button>
                )}
                {data &&
                    data.map((item) => (
                        <AssistantsCard key={item.id} data={item} />
                    ))}
            </EntitiesList>

            {/* TODO: Templates */}
            {/* {!data || */}
            {/*     (data && data.length <= 4 && ( */}
            {/*         <div className={s.templates}> */}
            {/*             <EntitiesList title={t('Начать с шаблона')}> */}
            {/*                 {dataTemplates.map((item) => ( */}
            {/*                     <AssistantsCard */}
            {/*                         key={item.id} */}
            {/*                         data={item} */}
            {/*                         isTemplate */}
            {/*                     /> */}
            {/*                 ))} */}
            {/*             </EntitiesList> */}
            {/*         </div> */}
            {/*     ))} */}
        </div>
    );
};
