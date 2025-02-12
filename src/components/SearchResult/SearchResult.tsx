import { useCallback, useContext, useEffect, useState } from 'react';
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
import Pagination from '../Pagination/Pagination.tsx';
import { useSearchParams } from 'react-router-dom';

const SearchResult = () => {
  const context = useContext(SearchContext);
  const [offset, setOffset] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams([['page', '0']]);
  const currentPage = Number(searchParams.get('page')) || 0;
  const setCurrentPage = (page: number) => {
    setSearchParams([['page', String(page)]]);
  };

  const [response, setResponse] = useState<
    null | Pokemon | NamedAPIResourceList
  >(null);
  const [requestStatus, setRequestStatus] = useState<
    'loading' | 'error' | 'finished'
  >('loading');

  const requestPokemons = useCallback(
    async (
      searchValue: SearchContextType['value'],
      { signal, offset }: { offset?: number; signal?: AbortSignal }
    ) => {
      setRequestStatus('loading');
      try {
        const response = searchValue
          ? await PokemonAPI.getByName(searchValue, signal)
          : await PokemonAPI.getAll({ signal, offset });

        if (response.ok) {
          setResponse(
            (await response.json()) as Pokemon | NamedAPIResourceList
          );
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
    },
    []
  );

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    requestPokemons(context.value, { offset, signal });

    return () => {
      abortController.abort();
    };
  }, [context.value, offset, requestPokemons]);

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
    <>
      <PokemonsList
        items={response.results.map((item) => {
          const id = PokemonAPI.getPokemonIdFromUrl(item.url);

          return { name: item.name, id };
        })}
      />
      <Pagination
        total={response.count}
        limit={PokemonAPI.limit}
        page={currentPage}
        onChange={(page, offset) => {
          setCurrentPage(page);
          setOffset(offset);
        }}
      />
    </>
  );
};

export default SearchResult;
