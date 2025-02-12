import './PokemonsList.css';
import PokemonCard, { PokemonCardProps } from '../PokemonCard/PokemonCard.tsx';

export type PokemonsListProps = {
  items: PokemonCardProps[];
};

const PokemonsList = ({ items }: PokemonsListProps) => {
  return (
    <div className="pokemons-list">
      {items.map((item) => (
        <PokemonCard
          key={item.id}
          name={item.name}
          id={item.id}
          className="pokemons-list__item"
        />
      ))}
    </div>
  );
};

export default PokemonsList;
