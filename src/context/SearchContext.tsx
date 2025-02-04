import { Component, createContext, PropsWithChildren } from 'react';

const localStorageSearchValueKey = 'searchValue';

export type SearchContextType = {
  value: string;
  setValue: (value: string) => void;
};

export const SearchContext = createContext<SearchContextType>({
  value: '',
  setValue: () => {},
});

export class SearchContextProvider extends Component<
  PropsWithChildren,
  SearchContextType
> {
  private setValue: (value: string) => void;

  constructor(props: PropsWithChildren) {
    super(props);

    this.setValue = (value: string) => {
      this.setState({ value });
      localStorage.setItem(localStorageSearchValueKey, value);
    };

    this.state = {
      value: localStorage.getItem(localStorageSearchValueKey) || '',
      setValue: this.setValue,
    };
  }

  render() {
    return (
      <SearchContext.Provider value={this.state}>
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}
