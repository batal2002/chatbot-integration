import classNames from 'classnames';
import { ChangeEvent, FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import s from './KeyItem.module.scss';
import { IconButton } from '@/shared/ui/IconButton/IconButton';
import { Input } from '@/shared/ui/Input/Input';
import Menu from '@/shared/assets/icons/menu.svg';
import {
    DropdownList,
    DropdownListData,
} from '@/shared/ui/DropdownList/DropdownList';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';
import { CopyText } from '@/features/CopyText';
import { SwipedModal } from '@/shared/ui/SwipedModal/SwipedModal';
import Delete from '@/shared/assets/icons/delete.svg';
import Reset from '@/shared/assets/icons/reset.svg';

interface KnowledgeBaseItemProps {
    className?: string;
    name: string;
    token: string;
}

export const KeyItem: FC<KnowledgeBaseItemProps> = (props) => {
    const { className, name, token } = props;
    const { t } = useTranslation();
    const [value, setValue] = useState(name);
    const [open, setOpen] = useState(false);
    const { isTablet, isMobile } = useScreenDetector();
    const dropdownData: DropdownListData[] = useMemo(
        () => [
            {
                label: t('Обновить токен'),
                onClick: () => {},
            },
            {
                label: t('Удалить ключ'),
                onClick: () => {},
            },
        ],
        [t],
    );

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <li className={classNames(s.KeyItem, {}, [className])}>
            <span className={s.wrapper}>
                <Input
                    value={value}
                    onChange={onChange}
                    width={isTablet ? 'auto' : 'm'}
                />
                <CopyText text={token} className={s.copy} width="auto" />

                {isMobile ? (
                    <>
                        <IconButton
                            className={s.menu}
                            icon={<Menu />}
                            onClick={() => setOpen(true)}
                        />

                        <SwipedModal open={open} onClose={() => setOpen(false)}>
                            <h5 className={s.label}>
                                {t('Действие с API ключом')}
                            </h5>
                            <button type="button" className={s.button}>
                                <Reset className={s.icon} />
                                <span>{t('Обновить токен')}</span>
                            </button>
                            <button type="button" className={s.button}>
                                <Delete className={s.icon} />
                                <span>{t('Удалить ключ')}</span>
                            </button>
                        </SwipedModal>
                    </>
                ) : (
                    <DropdownList data={dropdownData} className={s.menu}>
                        <IconButton icon={<Menu />} />
                    </DropdownList>
                )}
            </span>
        </li>
    );
};
