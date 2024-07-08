import { FC } from 'react';
import { useParams } from 'react-router-dom';
import s from './GeneralPage.module.scss';
import { GeneralForm } from '@/features/GeneralForm';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';
import { PageLoader } from '@/widgets/PageLoader';
import { useGetAssistantDataQuery } from '@/entities/Assistant';

export const GeneralPage: FC = () => {
    const { isTablet } = useScreenDetector();

    const { chatbotId } = useParams();
    const { data, isLoading } = useGetAssistantDataQuery(chatbotId);

    if (isLoading) return <PageLoader size="child" />;

    return (
        <div className={s.GeneralPage}>
            <GeneralForm assistantData={data} />
        </div>
    );
};
