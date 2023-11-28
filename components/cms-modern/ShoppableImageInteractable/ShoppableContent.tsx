import { Tooltip, Typography } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import { commerceApi } from '@pages/api';
import { Product } from '@amplience/dc-integration-middleware';
import fetchContent from '@lib/cms/fetchContent';
import { useCmsContext } from '@lib/cms/CmsContext';
import { CmsContent } from '@lib/cms/CmsContent';

type ShoppableContentProps = {
    title: string;
    target: string;
};

const isContent = (content?: CmsContent) => {
    return content && content.text;
};

export const ShoppableContent = ({ title, target }: ShoppableContentProps) => {
    const [content, setContent] = useState<CmsContent>();
    const [loading, setLoading] = useState(true);
    const context = useCmsContext();

    useEffect(() => {
        let useResult = true;
        fetchContent([{key: target}], context).then((result) => {
            if (useResult && result && result[0]) {
                const resultContent = result[0];
                setContent(resultContent);
                setLoading(false);
            }
        });
        return () => {
            useResult = false;
        };
    }, [target]);

    const enhancedTooltip = (content?: CmsContent) => {
        if (!isContent(content)) {
            return <div>Content not found</div>;
        }

        return (
            <div className="shoppable-product-tooltip__container">
                <div className="shoppable-product-tooltip__content">
                    <div>{JSON.stringify(content?.text)}</div>
                </div>
            </div>
        );
    };

    return (
        <Tooltip title={!loading ? enhancedTooltip(content) : 'Loading...'} followCursor>
            <Typography>Content</Typography>
        </Tooltip>
    );
};
