import React, { useMemo } from 'react';
import { CmsContent } from '@lib/cms/CmsContent';
import { useUserContext } from '@lib/user/UserContext';
import ContentBlock from '../ContentBlock';

type PersonalizedBannerSlotProps = {
    segments: {
        segment: string[];
        content: CmsContent;
    }[];
} & CmsContent;

const PersonalizedBannerSlot = ({ segments }: PersonalizedBannerSlotProps) => {
    const { segment: userSegment = '' } = useUserContext() || {};

    const matchedSegment = useMemo(() => {
        if (!segments) return null;
        // default to the first
        let result = null;
        if (userSegment) {
            let isBreak = false;
            // This path if there is a user segment in place
            for (const segment of segments) {
                if (isBreak) break;
                if (segment.segment && segment.segment.length > 0) {
                    for (const item in segment.segment) {
                        if (segment.segment[item] === userSegment) {
                            result = segment;
                            isBreak = true;
                            break;
                        }
                    }
                }
            }
        } else {
            // We should try and find the first without any segments
            for (const segment of segments) {
                if (!segment.segment) {
                    result = segment;
                    break;
                }
            }
        }

        return result;
    }, [userSegment, segments]);

    if (matchedSegment) {
        return <ContentBlock content={matchedSegment.content} />;
    } else {
        return null;
    }
};

export default PersonalizedBannerSlot;
