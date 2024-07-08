import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Button } from '@/shared/ui/Button/Button';
import s from './DeleteAssistantModal.module.scss';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';
import Alert from '@/shared/assets/icons/alert.svg';
import { useDeleteAssistantMutation } from '@/entities/Assistant';

interface AddMemberModalProps {
    onClose: () => void;
    open: boolean;
}

export const DeleteAssistantModal: FC<AddMemberModalProps> = (props) => {
    const { open, onClose } = props;
    const { isMobile } = useScreenDetector();
    const { t } = useTranslation();
    const { chatbotId } = useParams();
    const navigate = useNavigate();
    const [trigger, { isLoading: isLoadingDelete, isSuccess }] =
        useDeleteAssistantMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate('/');
        }
    }, [isSuccess, navigate]);

    return (
        <Modal onClose={onClose} open={open} size={isMobile ? 's' : 'xs'}>
            <div className={s.wrapper}>
                <div className={s.iconWrapper}>
                    <Alert className={s.alertIcon} />
                </div>
                <h5 className={s.title}>{t('Удалить чатбота')}</h5>
                <span className={s.description}>
                    {t(
                        'Вы уверены, что хотите удалить своего чатбота? Это действие нельзя отменить',
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
                        onClick={() => trigger(chatbotId)}
                        disabled={isLoadingDelete}
                    >
                        {t('Удалить')}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
