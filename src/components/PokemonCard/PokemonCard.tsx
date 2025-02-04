import { Component } from 'react';
import PokemonAPI, { Pokemon } from '../../api/PokemonAPI.ts';
import './PokemonCard.css';

export type PokemonCardProps = {
  name: Pokemon['name'];
  id: Pokemon['id'];
  className?: string;
};

class PokemonCard extends Component<PokemonCardProps> {
  static defaultProps = {
    className: '',
  };

  render() {
    const imageSrc = PokemonAPI.getPokemonSprite(this.props.id);

    return (
      <figure className={`pokemon-card ${this.props.className}`}>
        <img
          className="pokemon-card__image"
          src={imageSrc}
          alt={this.props.name}
        />
        <figcaption className="pokemon-card__caption">
          {this.props.name}
        </figcaption>
      </figure>
    );
  }
}

export default PokemonCard;
