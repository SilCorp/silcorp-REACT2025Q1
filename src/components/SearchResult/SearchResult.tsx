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
};

class SearchResult extends Component<SearchResultProps, SearchResultState> {
  static contextType = SearchContext;

  constructor(props: SearchResultProps) {
    super(props);

    this.state = {
      searchValue: undefined,
      response: null,
    };
  }

  async componentDidMount() {
    const contextSearchValue = (this.context as SearchContextType).value;
    this.setState({ searchValue: contextSearchValue });
    const response = contextSearchValue
      ? await PokemonAPI.getByName(contextSearchValue)
      : await PokemonAPI.getAll();

    this.setState({ response });
  }

  async componentDidUpdate() {
    const contextSearchValue = (this.context as SearchContextType).value;

    if (this.state.searchValue === contextSearchValue) return;

    this.setState({ searchValue: contextSearchValue });

    const response = contextSearchValue
      ? await PokemonAPI.getByName(contextSearchValue)
      : await PokemonAPI.getAll();

    this.setState({ response });
  }

  render() {
    const response = this.state.response;

    if (!response) return 'Loader';

    if (isPokemon(response)) return 'Pokemon';

    return 'Pokemon list';
  }
}

export default SearchResult;
