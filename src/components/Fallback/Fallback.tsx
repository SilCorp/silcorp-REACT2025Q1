import { Component } from 'react';
import pika from '../../assets/dead-pika.webp';
import './Fallback.css';

class Fallback extends Component {
  render() {
    return (
      <div className="fallback">
        <h1>Look what you&#39;ve done!</h1>
        <h2>No more pokemon, mate</h2>
        <img className="fallback__image" src={pika} alt="dead pikachu" />
      </div>
    );
  }
}

export default Fallback;
