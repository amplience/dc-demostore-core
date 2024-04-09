import trackEvent, { TrackingEvent } from './trackEvent';
import { useCmsContentItem } from '@components/cms-modern/CmsContentItem/CmsContentItem';
import { useCmsEdition } from '@components/cms-modern/CmsEdition/CmsEdition';
import { useCmsSlot } from '@components/cms-modern/CmsSlot/CmsSlot';
let enabled = false;

export function useContentAnalytics() {
    const { id: cmsContentId } = useCmsContentItem() || {};

    const { id: cmsEditionId } = useCmsEdition() || {};

    const { id: cmsSlotId } = useCmsSlot() || {};

    return {
        trackEvent: (event: TrackingEvent) => {
            enabled &&
                trackEvent({
                    ...event,
                    context: {
                        cmsContentId,
                        cmsEditionId,
                        cmsSlotId,
                    },
                });
        },
    };
}
