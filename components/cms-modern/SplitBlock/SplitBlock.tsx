import React, { useMemo } from 'react';
import { Theme } from '@mui/material';
import { CmsContent } from '@lib/cms/CmsContent';
import { ContentBlock } from '@components/cms-modern';

const styles = (theme: Theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row' as 'row',
        flexBasis: 1,
        flex: 1,

        [theme.breakpoints.down('md')]: {
            flexDirection: 'column' as 'column',
            alignItems: 'unset',
        },
    },
    column: {
        [theme.breakpoints.down('md')]: {
            maxWidth: '100% !important',
        },
        paddingTop: '20px',
    },
});

interface Props {
    classes?: any;
    className?: string;
    style?: React.CSSProperties;
    split: string;
    bgcol: string;
    content: CmsContent[];
}

const SplitBlock = (props: Props) => {
    const { classes, split = '50/50', bgcol, content = [], ...other } = props;

    const splits = useMemo(() => {
        return split.split('/').map((x: string) => Number(x) / 100);
    }, [split]);

    return (
        <div className={classes?.root} style={{ backgroundColor: bgcol }}>
            {content.map((content: any, index: number) => {
                return (
                    <div
                        key={index}
                        className={classes?.column}
                        style={{ flex: splits[index], maxWidth: `${splits[index] * 100}%` }}
                    >
                        <ContentBlock content={content} />
                    </div>
                );
            })}
        </div>
    );
};

export default SplitBlock;
