import { FC, useMemo, useState } from 'react';
import Menu from 'shared/assets/icons/menu.svg';
import { useTranslation } from 'react-i18next';
import { ChangeRoleModal } from '@/features/ChangeRole/ui/ChangeRoleModal/ChangeRoleModal';
import { Member } from '@/shared/model/types/member';
import {
    DropdownList,
    DropdownListData,
} from '@/shared/ui/DropdownList/DropdownList';
import { IconButton } from '@/shared/ui/IconButton/IconButton';
import s from './TeamCard.module.scss';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';
import { SwipedModal } from '@/shared/ui/SwipedModal/SwipedModal';
import Person from '@/shared/assets/icons/person.svg';
import Delete from '@/shared/assets/icons/delete.svg';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { OverflowText } from '@/shared/ui/OverflowText/OverflowText';

interface TeamCardProps {
    data: Member;
}

export const TeamCard: FC<TeamCardProps> = (props) => {
    const { data } = props;
    const { name, role, id, email } = data;
    const { isMobile } = useScreenDetector();
    const { t } = useTranslation();
    const [changeRole, setChangeRole] = useState(false);
    const [open, setOpen] = useState(false);

    const dropdownData: DropdownListData[] = useMemo(
        () => [
            {
                label: t('Поменять роль'),
                onClick: () => setChangeRole(true),
            },
            {
                label: t('Удалить пользователя'),
                onClick: () => {},
            },
        ],
        [t],
    );

    return (
        <div
            className={s.TeamCard}
            onClick={
                isMobile && role !== 'Владелец' ? () => setOpen(true) : () => {}
            }
        >
            <div className={s.MemberInfo}>
                <Avatar name={name} size={isMobile ? 's' : 'm'} />
                <div className={s.info}>
                    <span className={s.name}>{name}</span>
                    <OverflowText className={s.email}>{email}</OverflowText>
                </div>
            </div>
            <div className={s.actions}>
                {role !== 'Владелец' && !isMobile && (
                    <DropdownList data={dropdownData}>
                        <IconButton icon={<Menu />} />
                    </DropdownList>
                )}
                <div className={s.role}>{role}</div>
            </div>
            {changeRole && (
                <ChangeRoleModal
                    open={changeRole}
                    onClose={() => setChangeRole(false)}
                    data={data}
                />
            )}
            {isMobile && role !== 'Владелец' && (
                <SwipedModal open={open} onClose={() => setOpen(false)}>
                    <h5 className={s.label}>
                        {t('Участник')} {name}
                    </h5>
                    <button
                        type="button"
                        className={s.button}
                        onClick={() => setChangeRole(true)}
                    >
                        <Person className={s.icon} />
                        <span>{t('Поменять роль')}</span>
                    </button>
                    <button type="button" className={s.button}>
                        <Delete className={s.icon} />
                        <span>{t('Удалить участника')}</span>
                    </button>
                </SwipedModal>
            )}
        </div>
    );
};
