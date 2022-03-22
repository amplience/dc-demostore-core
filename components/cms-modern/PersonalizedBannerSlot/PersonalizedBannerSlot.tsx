import React, { FC, useMemo } from 'react'
import { CmsContent } from '@lib/cms/CmsContent';
import { useUserContext } from '@lib/user/UserContext';
import ContentBlock from '../ContentBlock';

type Props = {
    segments: {
        segment: string;
        content: CmsContent;
    }[];
} & CmsContent;

const PersonalizedBannerSlot: FC<Props> = ({ segments }) => {
    const {
        segment: userSegment = ''
    } = useUserContext() || {};

    const matchedSegment = useMemo(() => {
        if(!segments) return null;
        let result = segments[0];
        for (const segment of segments) {
            if (segment.segment === userSegment) {
                result = segment;
            }
        }
        return result;
    }, [userSegment, segments]);

    if (matchedSegment) {
        return <ContentBlock content={matchedSegment.content} />;
    } else {
        return null;
    }
}

export default PersonalizedBannerSlot;