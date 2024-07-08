import { FC } from 'react';
import { TeamHeader } from '@/widgets/TeamHeader';
import { TeamList } from '@/widgets/TeamList';

export const TeamPage: FC = () => (
    <>
        <TeamHeader />
        <TeamList />
    </>
);
