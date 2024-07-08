import { FC } from 'react';
import Logo from 'shared/assets/icons/logo.svg';
import { Link } from 'react-router-dom';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import s from './AssistantsCard.module.scss';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';
import { OverflowText } from '@/shared/ui/OverflowText/OverflowText';
import { Assistant } from '@/entities/Assistant';

interface AssistantsCardProps {
    data: Assistant;
    isTemplate?: boolean;
}

export const AssistantsCard: FC<AssistantsCardProps> = (props) => {
    const { data, isTemplate } = props;
    const { id, name, updated_at, description } = data;

    const { isMobile } = useScreenDetector();

    return (
        <Link to={`/chatbot/${id}`} className={s.AssistantsCard}>
            <div className={s.background}>
                <Logo className={s.icon} />
            </div>
            <div className={s.footer}>
                <OverflowText className={s.name}>{name}</OverflowText>
                {!isMobile && (
                    <div className={s.description}>
                        {!isTemplate && <Avatar size="xs" name="Алина" />}
                        <span>
                            {updated_at
                                ? `Последнее изменение ${new Date(
                                      updated_at,
                                  ).toLocaleString('ru', {
                                      day: 'numeric',
                                      month: 'numeric',
                                      year: 'numeric',
                                  })}`
                                : description}
                        </span>
                    </div>
                )}
            </div>
        </Link>
    );
};
