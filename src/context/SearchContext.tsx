import { createContext, PropsWithChildren, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.ts';

export type SearchContextType = {
  value: string;
  setValue: (value: string) => void;
};

export const SearchContext = createContext<SearchContextType>({
  value: '',
  setValue: () => {},
});

export const SearchContextProvider = ({ children }: PropsWithChildren) => {
  const [storageValue, setStorageValue] = useLocalStorage('searchValue', '');

  const state = useMemo(
    () => ({
      value: storageValue || '',
      setValue: setStorageValue,
    }),
    [setStorageValue, storageValue]
  );

  return (
    <SearchContext.Provider value={state}>{children}</SearchContext.Provider>
  );
};
