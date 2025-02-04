import { Component } from 'react';
import './PokemonsList.css';
import PokemonCard, { PokemonCardProps } from '../PokemonCard/PokemonCard.tsx';

export type PokemonsListProps = {
  items: PokemonCardProps[];
};

class PokemonsList extends Component<PokemonsListProps> {
  render() {
    return (
      <div className="pokemons-list">
        {this.props.items.map((item) => (
          <PokemonCard
            key={item.id}
            name={item.name}
            id={item.id}
            className="pokemons-list__item"
          />
        ))}
      </div>
    );
  }
}

export default PokemonsList;
