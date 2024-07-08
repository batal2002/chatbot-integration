import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@/shared/ui/IconButton/IconButton';
import Edit from '@/shared/assets/icons/edit.svg';
import { ChangeEmailModal } from '@/features/ChangeEmail/ui/ChangeEmailModal/ChangeEmailModal';

export const ChangeEmailButton: FC = () => {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    return (
        <>
            <IconButton
                onClick={() => setOpen(true)}
                icon={<Edit />}
                iconColor="dark"
            />

            {open && (
                <ChangeEmailModal open={open} onClose={() => setOpen(false)} />
            )}
        </>
    );
};
