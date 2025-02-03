export type NamedAPIResource = {
  name: string;
  url: string;
};

export type NamedAPIResourceList = {
  count: number;
  next: string;
  previous: string;
  results: NamedAPIResource[];
};

export type Pokemon = {
  id: number;
  name: string;
  sprites: PokemonSprites;
};

export type PokemonSprites = {
  front_default: string;
};

class PokemonAPI {
  private url = 'https://pokeapi.co/api/v2/pokemon/';

  getAll = () => fetch(this.url);

  getByName = (name: string) => fetch(this.url + name);
}

export default new PokemonAPI();
