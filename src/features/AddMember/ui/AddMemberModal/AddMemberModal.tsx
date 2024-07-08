import { FC, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CopyText } from '@/features/CopyText';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Input } from '@/shared/ui/Input/Input';
import { Select } from '@/shared/ui/Select/Select';
import { SelectData } from '@/shared/model/types/selectData';
import { Button } from '@/shared/ui/Button/Button';
import s from './AddMemberModal.module.scss';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';

interface AddMemberModalProps {
    onClose: () => void;
    open: boolean;
}

export const AddMemberModal: FC<AddMemberModalProps> = (props) => {
    const { open, onClose } = props;
    const { isMobile } = useScreenDetector();
    const [email, setEmail] = useState('');
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

    const emailChange = (e: any) => {
        setEmail(e.target.value);
    };

    const onSelectChange = useCallback((value: SelectData) => {
        setRole(value);
    }, []);

    return (
        <Modal
            size="l"
            open={open}
            onClose={onClose}
            title={t('Добавить участников по почте')}
        >
            <div className={s.emailWrapper}>
                <Input
                    value={email}
                    onChange={emailChange}
                    placeholder={t('Введите почту')}
                    name="email"
                    width="auto"
                />
                <Select
                    size={isMobile ? 'auto' : 'xs'}
                    data={selectData}
                    selectValue={role}
                    onChange={onSelectChange}
                />
            </div>

            <span className={s.info}>Доступно 1 место из 2</span>

            <h5 className={s.title}>{t('Предоставить доступ по ссылке')}</h5>

            <div className={s.copyWrapper}>
                <CopyText text="https://creator.runai.com/workspace/accept-invite?inviteToken=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NN" />
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
                <Button size="s" variant="outline" onClick={onClose}>
                    {t('Добавить')}
                </Button>
            </div>
        </Modal>
    );
};
