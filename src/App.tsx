import { Component } from 'react';
import SearchInput from './components/SearchInput/SearchInput.tsx';
import './App.css';
import SearchResult from './components/SearchResult/SearchResult.tsx';

class App extends Component {
  render() {
    return (
      <>
        <header>
          <h1 className="title">Pokemon finder</h1>
          <SearchInput />
        </header>
        <main>
          <SearchResult />
        </main>
      </>
    );
  }
}

export default App;
