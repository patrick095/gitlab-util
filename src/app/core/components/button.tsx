import React from 'react';

interface ButtonPropsInterface {
    children: React.ReactNode;
    onClick?: any;
    loading?: boolean;
    enfase?: 'primary' | 'secondary' | 'terciary';
    className?: string;
}

export function Button({ children, onClick, loading, enfase, className }: ButtonPropsInterface) {
    if (typeof loading === 'undefined') loading = false;
    if (typeof enfase === 'undefined') enfase = 'primary';
    if (typeof className === 'undefined') className = '';

    return (
        <button className={`btn btn-${enfase} p-relative ${loading ? 'loading' : ''} ${className}`} onClick={onClick} id="listar-grupos">
            <span className={loading ? 'invisible' : ''}>{children}</span>
            <div className={loading ? 'spinner-border' : 'd-none'} role="status"></div>
        </button>
    );
}
