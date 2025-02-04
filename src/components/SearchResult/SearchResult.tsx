import { Component } from 'react';
import './SearchResult.css';
import PokemonAPI, {
  NamedAPIResourceList,
  Pokemon,
} from '../../api/PokemonAPI.ts';
import {
  SearchContext,
  SearchContextType,
} from '../../context/SearchContext.tsx';
import { isPokemon } from '../../utils/isPokemon.ts';
import PokemonsList from '../PokemonsList/PokemonsList.tsx';
import Loader from '../Loader/Loader.tsx';

type SearchResultProps = object;
type SearchResultState = {
  searchValue?: string;
  response: null | Pokemon | NamedAPIResourceList;
  requestStatus: 'loading' | 'error' | 'finished' | 'idle';
};

class SearchResult extends Component<SearchResultProps, SearchResultState> {
  static contextType = SearchContext;

  constructor(props: SearchResultProps) {
    super(props);

    this.requestPokemons = this.requestPokemons.bind(this);

    this.state = {
      searchValue: undefined,
      response: null,
      requestStatus: 'idle',
    };
  }

  async requestPokemons(searchValue: SearchContextType['value']) {
    this.setState({ searchValue, requestStatus: 'loading' });

    try {
      const response = searchValue
        ? await PokemonAPI.getByName(searchValue)
        : await PokemonAPI.getAll();

      if (response.ok) {
        this.setState({
          response: (await response.json()) as Pokemon | NamedAPIResourceList,
        });
      } else {
        this.setState({
          response: null,
        });
      }

      this.setState({ requestStatus: 'finished' });
    } catch {
      this.setState({ requestStatus: 'error' });
    }
  }

  componentDidUpdate() {
    const contextSearchValue = (this.context as SearchContextType).value;

    if (this.state.searchValue === contextSearchValue) return;

    this.requestPokemons(contextSearchValue);
  }

  render() {
    const response = this.state.response;
    const requestStatus = this.state.requestStatus;

    const isIdle = requestStatus === 'idle';
    const isLoading = requestStatus === 'loading';
    const isError = requestStatus === 'error';

    if (isIdle) {
      return (
        <div className="search-result">
          <span>Click search button to make request</span>
        </div>
      );
    }

    if (isLoading) {
      return <Loader />;
    }

    if (isError) {
      return 'Oops, something went wrong';
    }

    if (response === null) {
      return (
        <div className="search-result">
          <span>Nothing found</span>
        </div>
      );
    }

    if (isPokemon(response))
      return (
        <PokemonsList items={[{ name: response.name, id: response.id }]} />
      );

    return (
      <PokemonsList
        items={response.results.map((item) => {
          const id = PokemonAPI.getPokemonIdFromUrl(item.url);

          return { name: item.name, id };
        })}
      />
    );
  }
}

export default SearchResult;
