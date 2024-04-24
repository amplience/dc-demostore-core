import React, { useEffect, useState } from 'react';
import SearchResultsListing from './SearchResultsListing';
import { useNavigation } from '../../core/Masthead/NavigationContext';
import { useCmsContext } from '@lib/cms/CmsContext';
import { useUserContext } from '@lib/user/UserContext';
import isEmpty from 'lodash/isEmpty';
import algoliasearch from 'algoliasearch';

interface SearchResultsProps {
    searchTerm: string;
}

function generatePath(path: any, child: any) {
    if (child.title) {
        return `${path ? path + ' > ' : ''}${child.title}`;
    } else {
        return '';
    }
}
function find(needle: any, haystack: any) {
    return haystack && haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
}
function findNode(term: any, currentNode: any, path: any = ''): any {
    var i, currentChild, result;
    let results: any[] = [];
    if (find(term, currentNode.title)) {
        results.push({
            label: generatePath(path, currentNode),
            href: currentNode.href,
        });
        return results;
    }
    for (i = 0; i < currentNode.children.length; i += 1) {
        currentChild = currentNode.children[i];
        results = [...findNode(term, currentChild, generatePath(path, currentNode)), ...results];
    }
    return results;
}
function onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
}

import { commerceApi } from '@pages/api';
import { useAppContext } from '@lib/config/AppContext';
import { HitsProps } from 'react-instantsearch';

const SearchResults = (props: SearchResultsProps) => {
    const { rootItems } = useNavigation();
    const { searchTerm } = props;
    const [designers, setDesigners] = useState([]);
    const [searchResults, setSearchResults] = useState<any>([]);
    const [categories, setCategories] = useState([]);
    const [inspiration, setInspiration] = useState<any>([]);
    const { stagingApi } = useCmsContext() || {};
    const cmsContext = useCmsContext();
    const userContext = useUserContext();
    const { algolia, cms } = useAppContext();

    useEffect(() => {
        const fetchResults = async () => {
            if (algolia?.appId && algolia?.apiKey) {
                const client = algoliasearch(algolia?.appId, algolia?.apiKey);
                const indexName = stagingApi ? `${cms.hub}.blog-staging` : `${cms.hub}.blog-production`;
                const index = client.initIndex(indexName);
                const { hits } = await index.search(searchTerm);
                const mappedHits = hits?.map((hit: any) => {
                    return {
                        label: hit?.snippet?.title,
                        href: `/blog/${hit?._meta?.deliveryKey}`,
                    };
                });
                setInspiration(mappedHits.slice(0, 10));
            }

            if (!isEmpty(searchTerm)) {
                const productResponse = await commerceApi.getProducts({
                    keyword: searchTerm,
                    ...cmsContext,
                    ...userContext,
                    pageSize: 6,
                    pageCount: 1,
                });
                const products = productResponse.map((prod) => ({
                    ...prod,
                    href: `/product/${prod.id}/${prod.slug}`,
                }));
                setSearchResults(products);
            }

            const searchTermCategories = findNode(searchTerm, { children: rootItems })
                .filter(onlyUnique)
                .map(({ label, href }: any) => ({
                    label,
                    href,
                }))
                .slice(0, 10);
            setCategories(searchTermCategories);
        };

        fetchResults();
    }, [cms.hub, searchTerm, algolia, cmsContext, rootItems, stagingApi, userContext]);

    return (
        <div className={`search__results ${searchTerm ? 'search__results--active' : ''}`}>
            <div className="search__results__container">
                <SearchResultsListing
                    searchTerm={searchTerm}
                    searchResults={searchResults}
                    designers={designers}
                    categories={categories}
                    inspiration={inspiration}
                />
            </div>
        </div>
    );
};

export default SearchResults;
