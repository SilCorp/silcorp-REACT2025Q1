import { NamedAPIResourceList, Pokemon } from '../api/PokemonAPI.ts';

export const isPokemon = (
  pokemon: Pokemon | NamedAPIResourceList
): pokemon is Pokemon =>
  'id' in pokemon && 'name' in pokemon && 'sprites' in pokemon;
