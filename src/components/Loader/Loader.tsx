import { Component } from 'react';
import './Loader.css';

type LoaderProps = object;
type LoaderState = {
  dots: string;
};

class Loader extends Component<LoaderProps, LoaderState> {
  private timer?: number;

  constructor(props: LoaderProps) {
    super(props);

    this.state = {
      dots: ' '.repeat(3),
    };
  }

  manageDots = () => {
    this.setState(({ dots }) => {
      let newDotsValue = ' '.repeat(3);

      if (dots.charAt(2) !== '.') {
        newDotsValue = dots.replace(' ', '.');
      }

      return { dots: newDotsValue };
    });
  };

  componentDidMount() {
    this.timer = setInterval(this.manageDots, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className="loader">
        <span>Loading{this.state.dots}</span>
      </div>
    );
  }
}

export default Loader;
