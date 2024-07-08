import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button/Button';
import { DeleteAssistantModal } from '../DeleteAssistantModal/DeleteAssistantModal';

export const DeleteAssistantButton: FC = () => {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    return (
        <>
            <Button
                size="s"
                variant="outline"
                color="red"
                onClick={() => setOpen(true)}
            >
                {t('Удалить чатбота')}
            </Button>

            {open && (
                <DeleteAssistantModal
                    open={open}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    );
};
