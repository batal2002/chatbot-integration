import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button/Button';
import { CheckAnswerModal } from '../CheckAnswerModal/CheckAnswerModal';

interface AddMemberButtonProps {
    className?: string;
}

export const CheckAnswerButton: FC<AddMemberButtonProps> = (props) => {
    const { className } = props;

    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    return (
        <>
            <Button
                variant="clear"
                className={className}
                onClick={() => setOpen(true)}
            >
                {t('Проверить ответ')}
            </Button>

            {open && (
                <CheckAnswerModal open={open} onClose={() => setOpen(false)} />
            )}
        </>
    );
};
