import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { CmsContent } from '@lib/cms/CmsContent';
import { ContentBlock } from '@components/cms-modern';

interface Props {
    split: string;
    bgcol: string;
    content: CmsContent[];
}

const SplitBlock = (props: Props) => {
    const { split = '50/50', bgcol, content = [], ...other } = props;

    const splits = useMemo(() => {
        return split.split('/').map((x: string) => Number(x) / 100);
    }, [split]);

    return (
        <Box
            style={{
                display: 'flex',
                flexBasis: 1,
                flex: 1,
                backgroundColor: bgcol,
            }}
            sx={(theme) => {
                return {
                    alignItems: 'center',
                    flexDirection: 'row' as 'row',
                    [theme.breakpoints.down('md')]: {
                        flexDirection: 'column' as 'column',
                        alignItems: 'unset',
                    },
                };
            }}
        >
            {content.map((content: any, index: number) => {
                return (
                    <Box
                        key={index}
                        style={{ paddingTop: '20px', flex: splits[index] }}
                        sx={(theme) => {
                            return {
                                maxWidth: `${splits[index] * 100}%`,
                                [theme.breakpoints.down('md')]: {
                                    maxWidth: '100% !important',
                                },
                            };
                        }}
                    >
                        <ContentBlock content={content} />
                    </Box>
                );
            })}
        </Box>
    );
};

export default SplitBlock;
