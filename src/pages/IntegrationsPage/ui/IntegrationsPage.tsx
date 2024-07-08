import React, { FC } from 'react';
import { IntegrationCard } from '@/entities/IntegrationCard';
import s from './IntegrationsPage.module.scss';
import { useGetIntegrationsDataQuery } from '@/entities/Integration';
import { PageLoader } from '@/widgets/PageLoader';

const IntegrationsPage: FC = () => {
    const { data: integrationData, isLoading } = useGetIntegrationsDataQuery();
    if (isLoading) return <PageLoader size="child" />;

    return (
        <>
            {/* TODO: Filters */}
            {/* <IntegrationsHeader /> */}
            <div className={s.list}>
                {integrationData &&
                    integrationData.map((data) => (
                        <IntegrationCard key={data.id} data={data} />
                    ))}
            </div>
        </>
    );
};

export default IntegrationsPage;
