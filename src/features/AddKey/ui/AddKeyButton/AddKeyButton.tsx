import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button/Button';
import { AddKeyModal } from '@/features/AddKey/ui/AddKeyModal/AddKeyModal';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';

export const AddKeyButton: FC = () => {
    const { isMobile } = useScreenDetector();
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    return (
        <>
            <Button onClick={() => setOpen(true)} size={isMobile ? 's' : 'm'}>
                {t('Добавить новый ключ')}
            </Button>

            {open && <AddKeyModal open={open} onClose={() => setOpen(false)} />}
        </>
    );
};
