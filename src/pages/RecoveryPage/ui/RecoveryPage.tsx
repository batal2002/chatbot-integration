import { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import s from './RecoveryPage.module.scss';
import { Logo } from '@/shared/ui/Logo/Logo';
import { RecoveryForm } from '@/features/RecoveryForm';

export const RecoveryPage: FC = () => {
    const { t } = useTranslation();
    return (
        <div className={s.RecoveryPage}>
            <Logo />
            <div className={s.wrapper}>
                <RecoveryForm />
            </div>
            <span className={s.span}>
                <Trans i18nKey="no_account">
                    Нет аккаунта?{' '}
                    <Link className={s.link} to="/registration">
                        Зарегистрируйтесь
                    </Link>
                </Trans>
            </span>
        </div>
    );
};
