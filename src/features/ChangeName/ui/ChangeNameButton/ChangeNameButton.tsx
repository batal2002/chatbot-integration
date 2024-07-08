import { FC, useState } from 'react';
import { IconButton } from '@/shared/ui/IconButton/IconButton';
import Edit from '@/shared/assets/icons/edit.svg';
import { ChangeNameModal } from '@/features/ChangeName/ui/ChangeNameModal/ChangeNameModal';

export const ChangeNameButton: FC = (props) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <IconButton
                onClick={() => setOpen(true)}
                icon={<Edit />}
                iconColor="dark"
            />

            {open && (
                <ChangeNameModal open={open} onClose={() => setOpen(false)} />
            )}
        </>
    );
};
