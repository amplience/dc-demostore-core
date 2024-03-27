import React from 'react';
import SearchIcon from './SearchIcon';
import { getImageURL } from '@utils/getImageURL';
import Link from 'next/link';

interface Props {
    searchTerm: any;
    categories: any;
    designers: any;
    inspiration: any;
    searchResults: any;
}

const SearchResultsListing = (props: Props) => {
    const { categories, designers, inspiration, searchTerm, searchResults = [] } = props;

    if (!categories.length && !designers.length && !inspiration.length && !searchResults.length) {
        return <h3 className="search__results__listing__heading">No results found</h3>;
    }
    return (
        <div>
            <ul className="search__results__listing__list">
                <li>
                    <div className="search__results__listing">
                        <ul>
                            {searchResults.length > 0 && (
                                <li>
                                    <h3 className="search__results__listing__heading">Products</h3>
                                    <ul className="search__results__section">
                                        {searchResults.map(({ id, name, variants, href }: any, index: number) => {
                                            // Need to manipulate the image url for smart imaging and resize for performance
                                            let firstImage: string = '';
                                            if (variants[0].images) {
                                                if (variants[0].images[0] && variants[0].images[0].url) {
                                                    firstImage = variants[0].images[0].url;
                                                    if (firstImage.indexOf('cdn.media.amplience.net') > 0) {
                                                        firstImage = getImageURL(firstImage);
                                                    }
                                                }
                                            }

                                            let price = variants[0].listPrice;
                                            return (
                                                <li key={index}>
                                                    <Link passHref href={href}>
                                                        <span className="search__results__listing__term">
                                                            <img
                                                                loading="lazy"
                                                                alt={name}
                                                                src={firstImage}
                                                                width="50"
                                                                height="50"
                                                            />
                                                        </span>
                                                        <span className="search__results__listing__term">
                                                            <span className="search__results__listing__name">
                                                                {name}
                                                            </span>
                                                            <br />
                                                            <span className="search__results__listing__price">
                                                                {price}
                                                            </span>
                                                        </span>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </div>
                </li>

                <li>
                    <div className="search__results__listing">
                        <ul>
                            {categories.length > 0 && (
                                <li>
                                    <h3 className="search__results__listing__heading">Categories</h3>
                                    <ul className="search__results__section">
                                        {categories.map(({ label, count, href }: any, index: number) => {
                                            return (
                                                <li key={index}>
                                                    <Link passHref href={href}>
                                                        <span className="search__results__listing__icon">
                                                            <SearchIcon />
                                                        </span>
                                                        <span className="search__results__listing__term">
                                                            {searchTerm} in
                                                        </span>
                                                        <span className="search__results__listing__result">
                                                            {label}
                                                        </span>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            )}
                            {designers.length > 0 && (
                                <li>
                                    <h3 className="search__results__listing__heading">Designers</h3>
                                    <ul className="search__results__section">
                                        {designers.map(({ label, count }: any, index: number) => {
                                            return (
                                                <li key={index}>
                                                    <span className="search__results__listing__icon">
                                                        <SearchIcon />
                                                    </span>
                                                    <span className="search__results__listing__term">
                                                        {searchTerm} in
                                                    </span>
                                                    <span className="search__results__listing__result">{label}</span>
                                                    <span className="search__results__listing__count">({count})</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            )}
                            {inspiration.length > 0 && (
                                <li>
                                    <h3 className="search__results__listing__heading">Inspiration</h3>
                                    <ul className="search__results__section">
                                        {inspiration.map(({ label, href, count }: any, index: number) => {
                                            return (
                                                <li key={index}>
                                                    <Link passHref href={href}>
                                                        <span className="search__results__listing__icon">
                                                            <SearchIcon />
                                                        </span>
                                                        <span className="search__results__listing__term">
                                                            {searchTerm} in
                                                        </span>
                                                        <span className="search__results__listing__result">
                                                            {label}
                                                        </span>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default SearchResultsListing;
