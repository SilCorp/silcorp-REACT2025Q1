import { Component, createRef } from 'react';
import './SearchInput.css';
import {
  SearchContext,
  SearchContextType,
} from '../../context/SearchContext.tsx';

class SearchInput extends Component {
  static contextType = SearchContext;
  inputRef = createRef<HTMLInputElement>();

  onSearch = () => {
    const inputValue = this.inputRef.current?.value || '';
    (this.context as SearchContextType).setValue(inputValue);
  };

  render() {
    return (
      <SearchContext.Consumer>
        {({ value }) => (
          <search className="search-input">
            <input type="search" ref={this.inputRef} defaultValue={value} />
            <button onClick={this.onSearch}>Search</button>
          </search>
        )}
      </SearchContext.Consumer>
    );
  }
}

export default SearchInput;
