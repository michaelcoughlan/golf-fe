import { ChangeEvent } from 'react';

export interface Props {
    additionalClasses?: string;
    id: string;
    name: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type: string;
    value: number | string;
}
