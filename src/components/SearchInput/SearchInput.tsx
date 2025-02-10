import { useContext, useRef } from 'react';
import './SearchInput.css';
import {
  SearchContext,
  SearchContextType,
} from '../../context/SearchContext.tsx';

const SearchInput = () => {
  const context = useContext(SearchContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSearch = () => {
    const inputValue = (inputRef.current?.value || '').trim();
    (context as SearchContextType).setValue(inputValue);
  };

  return (
    <SearchContext.Consumer>
      {({ value }) => (
        <search className="search-input">
          <input
            type="search"
            ref={inputRef}
            defaultValue={value}
            placeholder="Name or Id"
          />
          <button onClick={onSearch}>Search</button>
        </search>
      )}
    </SearchContext.Consumer>
  );
};

export default SearchInput;
