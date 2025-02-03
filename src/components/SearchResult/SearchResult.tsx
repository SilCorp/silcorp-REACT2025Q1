import { Component } from 'react';
import PokemonAPI, {
  NamedAPIResourceList,
  Pokemon,
} from '../../api/PokemonAPI.ts';
import {
  SearchContext,
  SearchContextType,
} from '../../context/SearchContext.tsx';
import { isPokemon } from '../../utils/isPokemon.ts';

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

      this.setState({ requestStatus: 'finished' });

      if (response.ok) {
        this.setState({
          response: (await response.json()) as Pokemon | NamedAPIResourceList,
        });
      } else {
        this.setState({
          response: null,
        });
      }
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
      return 'Click search button to make request';
    }

    if (isLoading) {
      return 'Loading...';
    }

    if (isError) {
      return 'Oops, something went wrong';
    }

    if (response === null) {
      return 'Nothing found';
    }

    if (isPokemon(response)) return 'Pokemon';

    return 'Pokemon list';
  }
}

export default SearchResult;
