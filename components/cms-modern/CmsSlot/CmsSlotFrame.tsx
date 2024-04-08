import { useCmsSlot } from './CmsSlot';
import { ComponentFrame } from '@components/ui';
import s from './CmsSlotFrame.module.css';
import { PlusSquare, Pencil, Eye } from '@components/icons';
import { useAppContext } from '@lib/config/AppContext';
import { PropsWithChildren } from 'react';

interface CmsSlotFrameProps extends PropsWithChildren {}

const CmsSlotFrame = ({ children }: CmsSlotFrameProps) => {
    const { id, label } = useCmsSlot() || {};

    const { cms } = useAppContext();
    const handleEdit = () => {
        window.open(`https://app.amplience.net/#!/${cms.hub}/authoring/content-item/edit/${id}`);
    };

    const handleView = () => {
        const { protocol, host } = window.location;
        window.open(`${protocol}//${host}/visualization?content=${id}`);
    };

    return (
        <ComponentFrame
            menu={
                <>
                    <PlusSquare className={s.icon} />
                    <strong className={s.label}>{label}</strong>

                    <div className={s.actions}>
                        <button type="button" className="btn btn-sm" onClick={handleEdit}>
                            <Pencil />
                        </button>
                        <button type="button" className="btn btn-sm" onClick={handleView}>
                            <Eye />
                        </button>
                    </div>
                </>
            }
            MenuProps={{
                className: s.menu,
            }}
        >
            {children}
        </ComponentFrame>
    );
};

export default CmsSlotFrame;
