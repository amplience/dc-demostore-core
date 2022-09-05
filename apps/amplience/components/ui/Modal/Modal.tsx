import { FC, useRef } from 'react'
import s from './Modal.module.css';
import clsx from 'clsx';

interface Props {
    className?: string;
    open?: boolean
    onClose: () => void
}

const Modal: FC<Props> = ({
    open = false,
    onClose,
    children,
    ...other
}) => {

    let ref = useRef() as React.MutableRefObject<HTMLInputElement>

    return (
        <div className={clsx(
            'af-modal-content',
            {
                ['af-modal-content-active']: open
            }
        )}>
            <div
                className={s.modal}
                ref={ref}
                >
                <div className="af-modal">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;