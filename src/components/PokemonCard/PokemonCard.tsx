import PokemonAPI, { Pokemon } from '../../api/PokemonAPI.ts';
import './PokemonCard.css';
import { useMemo } from 'react';

export type PokemonCardProps = {
  name: Pokemon['name'];
  id: Pokemon['id'];
  className?: string;
};

const PokemonCard = (props: PokemonCardProps) => {
  const { name, id, className = '' } = props;

  const imageSrc = useMemo(() => PokemonAPI.getPokemonSprite(id), [id]);

  return (
    <figure className={`pokemon-card ${className}`}>
      <img className="pokemon-card__image" src={imageSrc} alt={name} />
      <figcaption className="pokemon-card__caption">{name}</figcaption>
    </figure>
  );
};

export default PokemonCard;
