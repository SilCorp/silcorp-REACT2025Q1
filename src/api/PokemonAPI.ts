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
  public limit = 20;

  getPokemonIdFromSprite = (spriteUrl: PokemonSprites['front_default']) => {
    const tokens = spriteUrl.split('/');
    const fileName = tokens[tokens.length - 2];

    return fileName.split('.')[0];
  };

  getPokemonIdFromUrl = (url: NamedAPIResource['url']) => {
    const tokens = url.split('/');

    return Number(tokens[tokens.length - 2]);
  };

  getPokemonSprite = (id: Pokemon['id']) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  };

  getAll = ({
    signal,
    offset = 0,
  }: {
    offset?: number;
    signal?: AbortSignal;
  }) => {
    const url = new URL(this.url);

    if (offset) {
      url.searchParams.set('offset', String(offset));
    }

    return fetch(url.toString(), { signal });
  };

  getByName = (name: string, signal?: AbortSignal) =>
    fetch(this.url + name, { signal });
}

export default new PokemonAPI();
