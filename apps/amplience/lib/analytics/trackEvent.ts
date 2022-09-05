export type TrackingEvent = {
    category: string;
    action: string;
    label?: string;
    value?: number;
    nonInteraction?: boolean;

    context?: {
        cmsSlotId?: string;
        cmsEditionId?: string;
        cmsContentId?: string;
    }
};

export default function trackEvent(event: TrackingEvent) {

    // Build arguments and track events
}