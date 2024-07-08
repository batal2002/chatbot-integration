import React, { FC } from 'react';
import { EntitiesList } from '@/shared/ui/EntitiesList/EntitiesList';
import { useGetTemplatesQuery } from '@/widgets/TemplatesList/api/templatesApi';

export const TemplatesList: FC = () => {
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
        {
            id: 2,
            name: 'Название ассистента 3',
            description: 'Чат бот для поддержки на сайте ',
        },
        {
            id: 3,
            name: 'Название ассистента 4',
            description: 'Чат бот для поддержки на сайте ',
        },
    ];

    const { data } = useGetTemplatesQuery();
    return (
        <EntitiesList>
            {/* {dataTemplates.map((item) => ( */}
            {/*     <AssistantsCard key={item.id} data={item} isTemplate /> */}
            {/* ))} */}a
        </EntitiesList>
    );
};
