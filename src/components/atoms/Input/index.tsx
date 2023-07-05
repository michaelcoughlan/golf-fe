import { ReactElement } from 'react';

import { Props } from './types';

const Input = ({ additionalClasses, id, name, onChange, placeholder, type, value }: Props): ReactElement => {
    const borderClasses = 'border border-slate-300 rounded-md';
    const focusClasses = 'focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1';

    return (
        <input
            id={id}
            className={`p-2 w-full ${borderClasses} shadow-sm ${focusClasses} placeholder:italic ${additionalClasses}`}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            value={value}
        />
    );
};

export default Input;
