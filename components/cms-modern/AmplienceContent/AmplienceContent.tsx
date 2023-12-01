import { useEffect, useState } from 'react';
import fetchContent from '@lib/cms/fetchContent';
import { useCmsContext } from '@lib/cms/CmsContext';
import { CmsContent } from '@lib/cms/CmsContent';
import ContentBlock from '../ContentBlock';
import { Box, CircularProgress } from '@mui/material';

type AmplienceContentProps = {
    deliveryKey: string;
};

const AmplienceContent = ({ deliveryKey }: AmplienceContentProps) => {
    const [content, setContent] = useState<CmsContent>();
    const [loading, setLoading] = useState(true);
    const context = useCmsContext();

    useEffect(() => {
        let useResult = true;
        if (useResult) {
            fetchContent([{ key: deliveryKey }], context).then((result) => {
                if (result && result[0]) {
                    setContent(result[0]);
                }
                setLoading(false);
            });
        }
        return () => {
            useResult = false;
        };
    }, [deliveryKey, context]);

    return (
        <>
            {loading && (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <CircularProgress />
                </Box>
            )}
            {!loading && content && <ContentBlock content={content} />}
            {!loading && !content && (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <div>Content not found</div>
                </Box>
            )}
        </>
    );
};

export default AmplienceContent;
