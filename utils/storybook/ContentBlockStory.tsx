import React from 'react';
import { CmsRequest } from '@lib/cms/fetchContent';
import { WithLazyContent } from '@components/cms-modern';
import { ContentBlock } from '@components/cms-modern';
import Skeleton from 'react-loading-skeleton';

import { useAppContext } from '@lib/config/AppContext';

interface Props {
    request: CmsRequest;
    overrideContent?: (content: any) => any;
}

const ContentBlockStory = (props: Props) => {
    const { request, overrideContent } = props;

    let { cms } = useAppContext();
    return (
        <WithLazyContent
            request={request}
            cmsContextOverrides={{ locale: 'en-US', stagingApi: cms.stagingApi }}
            enrichContent={true}
        >
            {({ content }) =>
                content ? <ContentBlock content={overrideContent ? overrideContent(content) : content} /> : <Skeleton />
            }
        </WithLazyContent>
    );
};

export default ContentBlockStory;
