import { Component } from 'react';
import './ErrorButton.css';

type ErrorButtonState = { throwError: boolean };

class ErrorButton extends Component<object, ErrorButtonState> {
  constructor(props: object) {
    super(props);

    this.state = {
      throwError: false,
    };
  }

  render() {
    if (this.state.throwError) {
      throw new Error('You broke the app! Are you satisfied now?');
    }

    return (
      <button
        className="error-button"
        onClick={() => {
          this.setState({ throwError: true });
        }}
      >
        Throw error!
      </button>
    );
  }
}

export default ErrorButton;
