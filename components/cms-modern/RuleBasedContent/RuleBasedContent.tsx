import React, { useMemo, useEffect, useState } from 'react';
import { Theme } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles'
import { useNavigation, NavigationItem } from '@components/core/Masthead';
import { walkNavigationItems } from '@components/core/Masthead/walkNavigation';

import algoliasearch from 'algoliasearch';
import { useCmsContext } from '@lib/cms/CmsContext';
import { WithLazyContent } from '@components/cms-modern';
import { ContentBlock } from '@components/cms-modern';
import { ContentBlockSkeleton } from '@components/cms-modern';
import { useUserContext } from '@lib/user/UserContext';
import { useAppContext } from '@lib/config/AppContext';

const styles = (theme: Theme) => ({
});

export type Rules = {
    productCategories?: string[];
    products?: string[];
    tags?: string[];
    pageTypes?: string[];
}

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties;
    variant?: 'single' | 'stack' | 'carousel';
    rules?: Rules;
    limit?: number;

    defaultSkeleton?: React.ReactElement;
}

const RuleBasedContent: React.SFC<Props> = (props) => {
    const { algolia, cms } = useAppContext();
    const searchClient = algoliasearch(algolia.appId, algolia.apiKey);
    const {
        classes,
        variant,
        rules = {},
        limit = 1,
        defaultSkeleton,
        ...other
    } = props;

    const {
        productCategories = [],
        products = [],
        tags = [],
        pageTypes = []
    } = rules;

    const {
        rootItems
    } = useNavigation();

    const {
        stagingApi
    } = useCmsContext() || {};

    const {
        segment
    } = useUserContext();

    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const query = useMemo(() => {

        let filterCategories: any = [];
        let filterTags: string[] = [];
        let filterProducts: string[] = [];
        let filterPageTypes: string[] = [];

        if (productCategories) {
            let nodes: NavigationItem[] = [];

            walkNavigationItems(rootItems, (item) => {
                if (item.category && productCategories.indexOf(item.category.id) !== -1) {
                    nodes.push(item);
                }
            });

            for (let node of nodes) {
                const pageIds = [node, ...node.parents].map(x => x.nodeContentItem?._meta?.deliveryId).filter(x => x != null);
                if (pageIds.length > 0) {
                    filterCategories = [...filterCategories, pageIds];
                }
            }
        }

        if (tags.length) {
            filterTags = [...filterTags, ...tags];
        }

        if (segment) {
            filterTags = [...filterTags, segment];
        } else {
            filterTags = [...filterTags, 'guest'];
        }

        if (pageTypes.length) {
            filterPageTypes = [...filterPageTypes, ...pageTypes];
        }

        if (products.length) {
            filterProducts = [...filterProducts, ...products];
        }
        return {
            facetFilters: [
                'active:true',
                [...filterCategories].map(x => `rules.productCategories:${x}`),
                [...filterTags].map(x => `rules.tags:${x}`),
                [...filterPageTypes].map(x => `rules.pageTypes:${x}`),
                [...filterProducts].map(x => `rules.products:${x}`)
            ]
        } as any;
    }, [rootItems, rules]);

    const fetchResults = async () => {
        setLoading(true);
        const results = await searchClient.search([{
            indexName: stagingApi ? `${cms.hub}.rule-based-staging` : `${cms.hub}.rule-based-production`,
            params: {
                ...query,
                hitsPerPage: limit
            }
        }]);
        setResults(results.results[0].hits);
        setLoading(false);
    };

    useEffect(() => {
        fetchResults();
    }, [query, stagingApi]);

    return (
        <>
            {
                loading ? defaultSkeleton : (
                    results.map(result => {
                        return <WithLazyContent request={{id: result.content.id as string}}>
                            {
                                ({content}) => {
                                    return content ? <ContentBlock content={content} /> : <ContentBlockSkeleton schema={result.content.schema} {...other} />;
                                }
                            }
                        </WithLazyContent>
                    })
                )
            }
        </>
    );
};

export default withStyles(styles)(RuleBasedContent);