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

  getAll = () => fetch(this.url);

  getByName = (name: string) => fetch(this.url + name);
}

export default new PokemonAPI();
