import { useUserContext } from '@lib/user/UserContext';
import React, { useState, useEffect, useMemo } from 'react';
import SearchIcon from './SearchIcon';
import SearchResults from './SearchResults';
import _ from 'lodash'
import { TextField } from '@mui/material';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleClick = () => {
    setSearchTerm('');
  };
  useEffect(function () {
    window.addEventListener('click', handleClick);
    return function cleanup() {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  const { language } = useUserContext();

  const debouncedResults = useMemo(() => {
    return _.debounce((x: any) => setSearchTerm(x.target.value), 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  let timeout: any = undefined
  return (
    <div className="search">
      <div className="search__icon">
        <SearchIcon />
      </div>
      <input
        className="search__input"
        type="text"
        placeholder={language === "de" ? 'SUCHE' : 'SEARCH'}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onChange={debouncedResults}
      />
      <SearchResults searchTerm={searchTerm} />
    </div>
  );
};

export default Search;
