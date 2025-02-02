import { Component, createRef } from 'react';
import './SearchInput.css';

class SearchInput extends Component {
  inputRef = createRef<HTMLInputElement>();

  onSearch = () => {
    const inputValue = this.inputRef.current?.value;
    console.log(inputValue);
  };

  render() {
    return (
      <search className="search-input">
        <input type="search" ref={this.inputRef} />
        <button onClick={this.onSearch}>Search</button>
      </search>
    );
  }
}

export default SearchInput;
