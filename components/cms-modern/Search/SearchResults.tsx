import React, { useEffect, useState } from 'react';
import SearchResultsListing from './SearchResultsListing';
import { useNavigation } from '../../core/Masthead/NavigationContext';
import { useCmsContext } from '@lib/cms/CmsContext';
import { useUserContext } from '@lib/user/UserContext';
import { Product, getCommerceAPI } from '@amplience/dc-demostore-integration'
import _ from 'lodash'

interface Props {
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
  return (
    haystack && haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1
  );
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
    results = [
      ...findNode(term, currentChild, generatePath(path, currentNode)),
      ...results,
    ];
  }
  return results;
}
function onlyUnique(value: any, index: any, self: any) {
  return self.indexOf(value) === index;
}

import { configLocator, useAppContext } from '@lib/config/AppContext';

const SearchResults: React.FC<Props> = (props) => {
  const { rootItems } = useNavigation();
  const { searchTerm } = props;
  const [designers, setDesigners] = useState([]);
  const [searchResults, setSearchResults] = useState<any>([]);
  const [categories, setCategories] = useState([]);
  const [inspiration, setInspiration] = useState<any>([]);
  const { stagingApi } = useCmsContext() || {};
  const cmsContext = useCmsContext()
  const userContext = useUserContext()
  const { algolia, cms } = useAppContext()

  const fetchResults = () => {
    const { algoliasearch } = window as any;
    const searchClient = algoliasearch(algolia.appId, algolia.apiKey);
    const indexName = stagingApi ? `${cms.hub}.blog-staging` : `${cms.hub}.blog-production`
    // this code searches in algolia for matching blog posts?
    searchClient
      .search([
        {
          indexName,
          query: searchTerm,
        },
      ])
      .then((algoliaResponse: any) => {
        const result: any[] = algoliaResponse.results[0].hits.map(
          (hit: any) => {
            return {
              label: hit.snippet.title,
              href: '/blog/' + hit._meta.deliveryId + '/' + hit._meta.name,
            };
          }
        );

        setInspiration(result.slice(0, 10));
      });
    // end algolia

    if (!_.isEmpty(searchTerm)) {
      getCommerceAPI()
        .then(api => api.getProducts({ keyword: searchTerm, ...cmsContext, ...userContext })
        .then(products => {
          setSearchResults(products.map((prod: Product) => ({
            ...prod,
            href: `/product/${prod.id}/${prod.slug}`
          })))
        }))
    }

    // ? category names?
    setCategories(
      findNode(searchTerm, { children: rootItems })
        .filter(onlyUnique)
        .map(({ label, href }: any) => ({
          label,
          href,
        }))
        .slice(0, 10)
    );
  };

  useEffect(fetchResults, [cms.hub, searchTerm, algolia, cmsContext, rootItems, stagingApi, userContext]);

  return (
    <div
      className={`search__results ${searchTerm ? 'search__results--active' : ''
        }`}
    >
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
