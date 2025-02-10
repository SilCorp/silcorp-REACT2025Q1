import { useContext, useEffect, useState } from 'react';
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

const SearchResult = () => {
  const context = useContext(SearchContext);
  const [response, setResponse] = useState<
    null | Pokemon | NamedAPIResourceList
  >(null);
  const [requestStatus, setRequestStatus] = useState<
    'loading' | 'error' | 'finished'
  >('loading');

  const requestPokemons = async (
    searchValue: SearchContextType['value'],
    signal?: AbortSignal
  ) => {
    setRequestStatus('loading');
    try {
      const response = searchValue
        ? await PokemonAPI.getByName(searchValue, signal)
        : await PokemonAPI.getAll(signal);

      if (response.ok) {
        setResponse((await response.json()) as Pokemon | NamedAPIResourceList);
      } else {
        setResponse(null);
      }

      setRequestStatus('finished');
    } catch {
      if (signal?.aborted) {
        return;
      }

      setRequestStatus('error');
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    requestPokemons(context.value, signal);

    return () => {
      abortController.abort();
    };
  }, [context.value]);

  const isLoading = requestStatus === 'loading';
  const isError = requestStatus === 'error';

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="search-result">
        <span>Oops, something went wrong</span>
      </div>
    );
  }

  if (response === null) {
    return (
      <div className="search-result">
        <span>Nothing found</span>
      </div>
    );
  }

  if (isPokemon(response))
    return <PokemonsList items={[{ name: response.name, id: response.id }]} />;

  return (
    <PokemonsList
      items={response.results.map((item) => {
        const id = PokemonAPI.getPokemonIdFromUrl(item.url);

        return { name: item.name, id };
      })}
    />
  );
};

export default SearchResult;
