import { PropsWithChildren, createContext, useContext } from 'react';
import { CmsContent } from '@lib/cms/CmsContent';
import CmsSlotFrame from './CmsSlotFrame';
import { useDebug } from '@components/ui';

interface CmsSlotProps extends PropsWithChildren {
    content: CmsContent;
}

type CmsSlotState = {
    id: string;
    label: string;
};

const CmsSlotContext = createContext<CmsSlotState | null>(null);

export function useCmsSlot(): CmsSlotState | null {
    return useContext(CmsSlotContext);
}

function remapLabel(label: string) {
    if (label === 'web/homepage/content-stack') {
        return 'web/homepage/body';
    }
    return label;
}

const CmsSlot = ({ content, children }: CmsSlotProps) => {
    const { showSlots } = useDebug();

    if (!content || !content._meta || !content._meta.deliveryId) {
        return <>{children}</>;
    }

    return (
        <CmsSlotContext.Provider
            value={{
                id: content._meta.deliveryId,
                label: remapLabel(content._meta.deliveryKey || content._meta.name || content._meta.deliveryId),
            }}
        >
            {!showSlots ? children : <CmsSlotFrame>{children}</CmsSlotFrame>}
        </CmsSlotContext.Provider>
    );
};

export default CmsSlot;
