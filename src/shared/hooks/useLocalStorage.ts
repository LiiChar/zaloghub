
import { useCallback, useEffect, useState } from "react";

export type SetStorageValue<T> = T | ((prev: T) => T);

export type UseStorageReturn<T> = {
  value: T | undefined;
  set: (value: SetStorageValue<T>) => void;
  remove: () => void;
};

export const useLocalStorage = <T>(
  key: string,
  initialValue?: T,
): UseStorageReturn<T> => {
  const [value, setValue] = useState<T | undefined>(initialValue);

  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(key);

      if (storedValue !== null) {
        setValue(JSON.parse(storedValue) as T);
      } else {
        setValue(initialValue);
      }
    } catch (error) {
      console.error(`Failed to read localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  const set = useCallback(
    (newValue: SetStorageValue<T>) => {
      setValue((prev) => {
        const nextValue =
          typeof newValue === "function"
            ? (newValue as (prev: T) => T)(prev as T)
            : newValue;

        try {
          localStorage.setItem(key, JSON.stringify(nextValue));
        } catch (error) {
          console.error(`Failed to write localStorage key "${key}":`, error);
        }

        return nextValue;
      });
    },
    [key],
  );

  const remove = useCallback(() => {
    setValue(initialValue);

    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== key && event.key !== null) return;

      try {
        if (event.newValue === null) {
          setValue(initialValue);
        } else {
          setValue(JSON.parse(event.newValue) as T);
        }
      } catch (error) {
        console.error(`Failed to sync localStorage key "${key}":`, error);
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [key, initialValue]);

  return {
    value,
    set,
    remove,
  };
};
