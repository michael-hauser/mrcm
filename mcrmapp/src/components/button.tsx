// components/Button.tsx

import React from 'react';

type ButtonProps = {
    type: 'primary' | 'secondary' | 'tertiary';
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ type, label, icon, onClick }) => {
    const baseStyles = "p-2 m-2 rounded flex items-center space-x-2";
    const typeStyles = {
        primary: "bg-blue-500 text-white",
        secondary: "bg-transparent border border-neutral-500",
        tertiary: "bg-transparent border border-neutral-500"
    }[type];

    return (
        <button
            className={`${baseStyles} ${typeStyles}`}
            onClick={onClick}
        >
            {icon && <span>{icon}</span>}
            <span>{label}</span>
        </button>
    );
};

export default Button;
