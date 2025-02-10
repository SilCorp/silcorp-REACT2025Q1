import { useState } from 'react';
import './ErrorButton.css';

const ErrorButton = () => {
  const [throwError, setThrowError] = useState(false);

  if (throwError) {
    throw new Error('You broke the app! Are you satisfied now?');
  }

  return (
    <button className="error-button" onClick={() => setThrowError(true)}>
      Throw error!
    </button>
  );
};

export default ErrorButton;
