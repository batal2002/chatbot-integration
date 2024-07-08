import { FC, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Member } from '@/shared/model/types/member';
import { Button } from '@/shared/ui/Button/Button';
import { Select } from '@/shared/ui/Select/Select';
import { SelectData } from '@/shared/model/types/selectData';
import s from './ChangeRoleModal.module.scss';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { OverflowText } from '@/shared/ui/OverflowText/OverflowText';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';

interface ChangeRoleProps {
    onClose: () => void;
    open: boolean;
    data: Member;
}

export const ChangeRoleModal: FC<ChangeRoleProps> = (props) => {
    const { open, onClose, data } = props;
    const { name, email, id } = data;
    const { isMobile } = useScreenDetector();
    const { t } = useTranslation();
    const selectData = useMemo(
        () => [
            {
                value: '0',
                title: t('Администратор'),
            },
            {
                value: '1',
                title: t('Редактор'),
            },
            {
                value: '2',
                title: t('Просмотр'),
            },
        ],
        [t],
    );

    const [role, setRole] = useState<SelectData>(selectData[0]);

    const onSelectChange = useCallback((value: SelectData) => {
        setRole(value);
    }, []);

    return (
        <Modal
            size="l"
            open={open}
            onClose={onClose}
            title={t('Обновить роль пользователя')}
        >
            <div className={s.content}>
                <div className={s.member}>
                    <div className={s.MemberInfo}>
                        <Avatar name={name} />
                        <div className={s.info}>
                            <span className={s.name}>{name}</span>
                            <OverflowText className={s.email}>
                                {email}
                            </OverflowText>
                        </div>
                    </div>
                    <Select
                        size={isMobile ? 'auto' : 'xs'}
                        data={selectData}
                        selectValue={role}
                        onChange={onSelectChange}
                    />
                </div>

                <div className={s.actions}>
                    <Button
                        size="s"
                        variant="outline"
                        color="dark"
                        onClick={onClose}
                    >
                        {t('Отменить')}
                    </Button>
                    <div className={s.wrapper}>
                        {!isMobile && (
                            <Button
                                size="s"
                                variant="outline"
                                color="red"
                                onClick={onClose}
                            >
                                {t('Удалить участника')}
                            </Button>
                        )}
                        <Button size="s" variant="outline" onClick={onClose}>
                            {t('Обновить')}
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
