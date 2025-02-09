import { useCallback, useEffect, useState } from 'react';
import './Loader.css';

const Loader = () => {
  const [dots, setDots] = useState(' '.repeat(3));

  const manageDots = useCallback(() => {
    setDots((prevValue) => {
      let newDotsValue = ' '.repeat(3);

      if (prevValue.charAt(2) !== '.') {
        newDotsValue = prevValue.replace(' ', '.');
      }

      return newDotsValue;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(manageDots, 500);

    return () => clearInterval(timer);
  }, [manageDots]);

  return (
    <div className="loader">
      <span>Loading{dots}</span>
    </div>
  );
};

export default Loader;
