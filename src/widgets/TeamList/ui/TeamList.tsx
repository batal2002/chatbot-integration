import { FC } from 'react';
import { TeamCard } from '@/entities/TeamCard';
import s from './TeamList.module.scss';
import { AddMemberButton } from '@/features/AddMember';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';

export const TeamList: FC = () => {
    const { isMobile } = useScreenDetector();
    const data = [
        {
            id: 0,
            name: 'Алина Козырева',
            email: 'alina.s.kozyreva@gmail.com',
            role: 'Владелец',
        },
        {
            id: 1,
            name: 'Алина Козырева',
            email: 'alina.s.kozyreva@gmail.com',
            role: 'Администратор',
        },
    ];

    return (
        <>
            <div className={s.TeamList}>
                {data.map((item) => (
                    <TeamCard key={item.id} data={item} />
                ))}
            </div>
            {isMobile && <AddMemberButton className={s.button} />}
        </>
    );
};
