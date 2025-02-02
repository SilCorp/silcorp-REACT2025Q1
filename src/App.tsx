import { Component } from 'react';
import SearchInput from './components/SearchInput/SearchInput.tsx';
import './App.css';

class App extends Component {
  render() {
    return (
      <>
        <header>
          <h1 className="title">Pokemon finder</h1>
          <SearchInput />
        </header>
        <main></main>
      </>
    );
  }
}

export default App;
