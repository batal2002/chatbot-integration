import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import s from './IntegrationCard.module.scss';
import {
    Integration,
    useGetUserIntegrationsDataQuery,
} from '@/entities/Integration';
import { useGetAssistantDataQuery } from '@/entities/Assistant';
import { ChangeTokenButton } from '@/features/ChangeToken/ui/ChangeTokenButton/ChangeTokenButton';

interface AssistantsCardProps {
    data: Integration;
}

export const IntegrationCard: FC<AssistantsCardProps> = (props) => {
    const { data } = props;
    const { id, name, slug, is_active, group } = data;

    const { t } = useTranslation();
    const { chatbotId } = useParams();
    const { data: assistantData } = useGetAssistantDataQuery(chatbotId);
    const { data: userIntegrationData, isLoading: isLoadingUserIntegration } =
        useGetUserIntegrationsDataQuery();

    const assistantIntegrations = useMemo(
        () =>
            userIntegrationData?.filter(
                (data) => data.model.id === assistantData?.model.id,
            ),
        [assistantData?.model.id, userIntegrationData],
    );

    const isActiveIntegration = useMemo(
        () => assistantIntegrations?.find((data) => data.integration.id === id),
        [assistantIntegrations, id],
    );

    return (
        <div className={classNames(s.IntegrationCard, {}, [])}>
            <div className={s.header}>
                {/* <img */}
                {/*     className={s.icon} */}
                {/*     src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzM2N18xMDI3MSkiPgo8cGF0aCBkPSJNMjQgMEMxNy42MzYyIDAgMTEuNTI3NSAyLjUzMDEzIDcuMDMxMjUgNy4wMjkzOEMyLjUzMDM2IDExLjUzMDQgMC4wMDEyNDY3NiAxNy42MzQ3IDAgMjRDMCAzMC4zNjI2IDIuNTMxMjUgMzYuNDcxNCA3LjAzMTI1IDQwLjk3MDZDMTEuNTI3NSA0NS40Njk5IDE3LjYzNjIgNDggMjQgNDhDMzAuMzYzOCA0OCAzNi40NzI1IDQ1LjQ2OTkgNDAuOTY4OCA0MC45NzA2QzQ1LjQ2ODggMzYuNDcxNCA0OCAzMC4zNjI2IDQ4IDI0QzQ4IDE3LjYzNzQgNDUuNDY4OCAxMS41Mjg2IDQwLjk2ODggNy4wMjkzOEMzNi40NzI1IDIuNTMwMTMgMzAuMzYzOCAwIDI0IDBaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMzY3XzEwMjcxKSIvPgo8cGF0aCBkPSJNMTAuODYzNyAyMy43NDY1QzE3Ljg2MTIgMjAuNjk4NSAyMi41MjYyIDE4LjY4ODggMjQuODU4NyAxNy43MThDMzEuNTI2MiAxNC45NDU2IDMyLjkwOTkgMTQuNDY0MSAzMy44MTM3IDE0LjQ0NzhDMzQuMDEyNCAxNC40NDQ2IDM0LjQ1NDkgMTQuNDkzNyAzNC43NDM3IDE0LjcyNzFDMzQuOTgzNyAxNC45MjQgMzUuMDUxMiAxNS4xOTAzIDM1LjA4NDkgMTUuMzc3MkMzNS4xMTQ5IDE1LjU2NCAzNS4xNTYyIDE1Ljk4OTYgMzUuMTIyNCAxNi4zMjE4QzM0Ljc2MjQgMjAuMTE2OCAzMy4xOTg3IDI5LjMyNjEgMzIuNDAzNyAzMy41NzY3QzMyLjA2OTkgMzUuMzc1MiAzMS40MDYyIDM1Ljk3ODIgMzAuNzY0OSAzNi4wMzcxQzI5LjM2OTkgMzYuMTY1MyAyOC4zMTI0IDM1LjExNjEgMjYuOTYyNCAzNC4yMzE1QzI0Ljg1MTIgMzIuODQ2NiAyMy42NTg3IDMxLjk4NDggMjEuNjA3NCAzMC42MzM3QzE5LjIzNzQgMjkuMDcyMiAyMC43NzQ5IDI4LjIxMzggMjIuMTI0OSAyNi44MTEzQzIyLjQ3NzQgMjYuNDQ0MiAyOC42MTk5IDIwLjg1ODYgMjguNzM2MiAyMC4zNTJDMjguNzUxMiAyMC4yODg2IDI4Ljc2NjIgMjAuMDUyMyAyOC42MjM3IDE5LjkyNzhDMjguNDg0OSAxOS44MDMgMjguMjc4NyAxOS44NDU3IDI4LjEyODcgMTkuODc5NUMyNy45MTQ5IDE5LjkyNzUgMjQuNTQzNyAyMi4xNTggMTguMDAzNyAyNi41NzA2QzE3LjA0NzQgMjcuMjI4MyAxNi4xODEyIDI3LjU0OSAxNS40MDEyIDI3LjUzMjFDMTQuNTQ2MiAyNy41MTM3IDEyLjg5NjIgMjcuMDQ3NiAxMS42Njk5IDI2LjY0OTNDMTAuMTY5OSAyNi4xNjA3IDguOTczNjkgMjUuOTAyMyA5LjA3ODY5IDI1LjA3MjVDOS4xMzExOSAyNC42NDA1IDkuNzI3NDQgMjQuMTk4MyAxMC44NjM3IDIzLjc0NjVaIiBmaWxsPSJ3aGl0ZSIvPgo8L2c+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMzY3XzEwMjcxIiB4MT0iMjQwMCIgeTE9IjAiIHgyPSIyNDAwIiB5Mj0iNDgwMCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMkFBQkVFIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzIyOUVEOSIvPgo8L2xpbmVhckdyYWRpZW50Pgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzM2N18xMDI3MSI+CjxyZWN0IHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K" */}
                {/*     alt="logo" */}
                {/* /> */}
                <div className={s.info}>
                    <h5 className={s.name}>{slug}</h5>
                    {/* <span className={s.description}>{slug}</span> */}
                </div>
                {isActiveIntegration ? (
                    <span
                        className={classNames(s.status, {}, [
                            isActiveIntegration.is_active
                                ? [s.active]
                                : [s.error],
                        ])}
                    >
                        {isActiveIntegration.is_active
                            ? t('Подключен')
                            : t('Сбой подключения')}
                    </span>
                ) : (
                    <span
                        className={classNames(s.status, {}, [
                            is_active ? [s.inactive] : [s.disabled],
                        ])}
                    >
                        {is_active ? t('Не подключен') : t('Скоро')}
                    </span>
                )}
            </div>

            <div className={s.actions}>
                {/* TODO:  */}
                {/* <Button variant="clear">{t('Как настроить')}</Button> */}

                <ChangeTokenButton
                    data={data}
                    isActiveIntegration={isActiveIntegration}
                    disabled={
                        isActiveIntegration?.integration.id === 2 ||
                        isLoadingUserIntegration
                    }
                />
            </div>
        </div>
    );
};
