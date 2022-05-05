import React, { useState, useEffect } from 'react';
import { Theme, useMediaQuery, useTheme } from '@mui/material';
import clsx from 'clsx';
import { withStyles, WithStyles } from '@mui/styles'

import { useAppContext } from '@lib/config/AppContext';

import { useCmsContext } from '@lib/cms/CmsContext';
import { Section, LegacySlider, LegacySliderSlide } from '@components/ui';

import DynamicBlogListCard from './DynamicBlogListCard';
import { useAsync } from '@lib/util';
import _ from 'lodash';

const styles = (theme: Theme) => ({
    root: {
    },
    list: {
        listStyle: 'none',
        margin: 0,
        padding: 0
    },
    item: {
        margin: theme.spacing()
    }
});

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties;
    header: string;
    numItems: number;
    tags?: { id: string }[],
    query?: string
}

const DynamicBlogList: React.SFC<Props> = (props) => {
    const {
        classes,
        className,
        header,
        tags,
        numItems = 3,
        query,
        ...other
    } = props;

    const [results, setResults] = useState([] as any);

    const { algolia } = useAppContext()
    const {
        stagingApi,
        locale
    } = useCmsContext() || {};
    useEffect(() => {
        if (typeof window !== "undefined") {
            const { algoliasearch } = window as any;
            const searchClient = algoliasearch(algolia.appId, algolia.apiKey);
            const blogIndex = _.find(algolia.indexes, i => i.key === 'blog')

            if (blogIndex) {
                searchClient.search([{
                    indexName: stagingApi ? blogIndex.staging : blogIndex.prod,
                    params: {
                        facetFilters: [
                            ...(tags || []).map(x => `snippet.tags.id:${x.id}`),
                            (locale || 'en-US').indexOf('en-') === 0 ? `locale:en-US` : `locale:${locale}`
                        ],
                        hitsPerPage: numItems
                    }
                }]).then((response: any) => setResults(response.results?.[0]?.hits || []))    
            }
        }
    }, [tags, numItems, stagingApi, locale, algolia]);

    return (
        <div className={clsx(classes.root, className)} {...other}>
            <Section title={header}>
                <LegacySlider>
                    {
                        results.map((result: any, index: number) => {
                            return <LegacySliderSlide key={index} index={index} className={clsx({
                                ['amp-length-2']: results.length < 3,
                                ['amp-length-3']: results.length >= 3
                            })}>
                                <DynamicBlogListCard data={result} className={classes.item} />
                            </LegacySliderSlide>
                        })
                    }
                </LegacySlider>
            </Section>
        </div>
    );
};

export default withStyles(styles)(DynamicBlogList);