import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import s from './AccountPage.module.scss';
import { Section } from '@/shared/ui/Section/Section';
import { ChangeNameButton } from '@/features/ChangeName';
import { UploadAvatar } from '@/features/UploadAvatar';
import { setCurrentPageTitle, setIsAuth } from '@/app/model/slice/appSlice';
import { useAppDispatch } from '@/shared/lib/hooks/redux';
import { useScreenDetector } from '@/shared/lib/hooks/useScreenDetector';
import { Button } from '@/shared/ui/Button/Button';
import { useGetUserDataQuery } from '@/entities/User';
import { PageLoader } from '@/widgets/PageLoader';

export const AccountPage: FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { isMobile } = useScreenDetector();
    const navigate = useNavigate();
    const [, , removeCookie] = useCookies();

    const { data, isFetching } = useGetUserDataQuery();

    useEffect(() => {
        dispatch(setCurrentPageTitle(t('Настройки профиля')));
    }, [dispatch, t]);

    if (isFetching) return <PageLoader size="child" />;

    return (
        <div className={s.AccountPage}>
            <Section className={s.section}>
                <UploadAvatar />
                <div className={s.wrapper}>
                    <span className={s.label}>{t('Имя пользователя')}</span>
                    <div className={s.info}>
                        <span className={s.outlineText}>
                            {data?.first_name}
                            {data?.last_name && ` ${data.last_name}`}
                        </span>
                        <ChangeNameButton />
                    </div>
                </div>
            </Section>
            {/* TODO: Change email */}
            {/* <Section> */}
            {/*     <span className={s.label}>{t('Почта')}</span> */}
            {/*     <div className={s.info}> */}
            {/*         <span className={s.outlineText}>{data?.email}</span> */}
            {/*         <ChangeEmailButton /> */}
            {/*     </div> */}
            {/* </Section> */}
            {/* TODO: Change password */}
            {/* <Section> */}
            {/*     <span className={s.label}>{t('Пароль')}</span> */}
            {/*     <div className={s.info}> */}
            {/*         <span className={s.outlineText}> */}
            {/*             ···························· */}
            {/*         </span> */}
            {/*         <ChangePasswordButton /> */}
            {/*     </div> */}
            {/* </Section> */}
            {isMobile && (
                <Button
                    variant="outline"
                    color="dark"
                    buttonWidth="auto"
                    onClick={() => {
                        dispatch(setIsAuth(false));
                        removeCookie('access');
                        removeCookie('refresh');
                        navigate('/login');
                    }}
                >
                    {t('Выйти из аккаунта')}
                </Button>
            )}
        </div>
    );
};
