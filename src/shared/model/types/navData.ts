import { ReactElement, ReactSVGElement } from 'react';

export interface NavDataChildren {
    to: string;
    icon: ReactElement<ReactSVGElement>;
    title: string;
    soon?: boolean;
}

export interface NavData {
    to: string;
    icon: ReactElement<ReactSVGElement>;
    title: string;
    children?: NavDataChildren[];
    soon?: boolean;
}
