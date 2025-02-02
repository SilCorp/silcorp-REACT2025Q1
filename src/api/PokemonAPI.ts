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
  private url = 'https://pokeapi.co/api/v2/';

  getAll = async (): Promise<NamedAPIResourceList> => {
    const response = await fetch(this.url);

    return await response.json();
  };

  getByName = async (name: string): Promise<Pokemon> => {
    const response = await fetch(this.url + name);

    return await response.json();
  };
}

export default new PokemonAPI();
