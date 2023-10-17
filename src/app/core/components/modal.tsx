'use client';

import { Dispatch, SetStateAction } from 'react';
import { Button } from './button';

interface ModalPropsInterface {
    children: React.ReactNode;
    title: string;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    showConfirmButton?: boolean;
    onConfirm?: any;
    loadingConfirm?: boolean;
}

export default function Modal({ title, open, children, onConfirm, setOpen, showConfirmButton, loadingConfirm }: ModalPropsInterface) {
    if (typeof showConfirmButton === 'undefined') showConfirmButton = true;
    if (typeof onConfirm === 'undefined') onConfirm = () => null;
    if (typeof loadingConfirm === 'undefined') loadingConfirm = false;

    return (
        <>
            <div className={open ? 'modal-backdrop fade show' : ''}></div>
            <div className="modal fade show" id="modal-confirm-projects" style={{ display: open ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">{children}</div>
                        <div className="modal-footer">
                            <Button enfase="secondary" onClick={() => setOpen(false)}>
                                Close
                            </Button>
                            <Button loading={loadingConfirm} onClick={onConfirm}>
                                Confirmar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
