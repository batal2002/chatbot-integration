import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Button } from '@/shared/ui/Button/Button';
import s from './DeleteIntegrationModal.module.scss';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';
import Alert from '@/shared/assets/icons/alert.svg';

interface AddMemberModalProps {
    onClose: () => void;
    open: boolean;
    name?: string;
    onDelete: () => void;
    isDeleting: boolean;
}

export const DeleteIntegrationModal: FC<AddMemberModalProps> = (props) => {
    const { open, onClose, name, onDelete, isDeleting } = props;
    const { isMobile } = useScreenDetector();
    const { t } = useTranslation();

    return (
        <Modal onClose={onClose} open={open} size={isMobile ? 's' : 'xs'}>
            <div className={s.wrapper}>
                <div className={s.iconWrapper}>
                    <Alert className={s.alertIcon} />
                </div>
                <h5 className={s.title}>{t('Удалить интеграцию')}</h5>
                <span className={s.description}>
                    {t(
                        `Вы уверены, что хотите удалить интеграцию с ${name}? Это действие нельзя отменить`,
                    )}
                </span>
                <div className={s.actions}>
                    <Button
                        variant="outline"
                        color="dark"
                        size="s"
                        onClick={onClose}
                    >
                        {t('Отменить')}
                    </Button>
                    <Button
                        variant="outline"
                        color="red"
                        size="s"
                        onClick={onDelete}
                        disabled={isDeleting}
                    >
                        {t('Удалить')}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
