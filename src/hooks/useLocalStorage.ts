import { SetStateAction, useCallback, useRef, useState } from 'react';

const getCurrentStorageValue = <T>(
  key: string,
  defaultValue: T | null = null
) => {
  const storageValue = localStorage.getItem(key);
  if (storageValue === null) {
    localStorage.setItem(key, JSON.stringify(defaultValue));

    return defaultValue;
  }

  return JSON.parse(storageValue) as T;
};

export const useLocalStorage = <T>(
  key: string,
  initialValue: T | null = null
) => {
  const initialValueRef = useRef<T | null>(initialValue);

  const [value, setValue] = useState<T | null>(() =>
    getCurrentStorageValue(key, initialValueRef.current)
  );

  const setStorageValue = useCallback(
    (v: SetStateAction<T | null>) => {
      if (v instanceof Function) {
        return setValue((prevState) => {
          const result = v(prevState);
          localStorage.setItem(key, JSON.stringify(result));

          return result;
        });
      }

      localStorage.setItem(key, JSON.stringify(v));
      setValue(v);
    },
    [key]
  );

  return [value, setStorageValue] as const;
};
