import React, { useMemo, useEffect, useState } from 'react';

import fetchContent, { CmsRequest } from '@lib/cms/fetchContent';
import { enrichPageContent } from '@lib/page/pageContent/enrichPageContent';
import { useCmsContext, CmsContext } from '@lib/cms/CmsContext';
import { CmsContent } from '@lib/cms/CmsContent';

interface Props {
    request: CmsRequest;
    children: (args: { content?: CmsContent }) => React.ReactElement;
    cmsContextOverrides?: Partial<CmsContext>;
    enrichContent?: boolean;
}

const WithLazyContent = (props: Props) => {
    const { request, children, cmsContextOverrides, enrichContent } = props;

    const [content, setContent] = useState<any | null>(null);

    const cmsContext = useCmsContext();

    useEffect(() => {
        let isMounted: boolean = true;
        const fetcher = async (input: CmsRequest) => {
            let fetchedContent: CmsContent | null = await fetchContent([input], {
                ...cmsContext,
                ...cmsContextOverrides,
            }).then((x) => x[0]);
            if (!fetchContent) {
                return null;
            }
            if (enrichContent) {
                fetchedContent = await enrichPageContent(fetchedContent, cmsContext);
            }
            return fetchedContent;
        };

        fetcher(request).then((content) => {
            if (isMounted) {
                setContent(content);
            }
        });
        return () => {
            isMounted = false;
        };
    }, [request, cmsContext, cmsContextOverrides, enrichContent]);

    return children({
        content,
    });
};

export default WithLazyContent;
