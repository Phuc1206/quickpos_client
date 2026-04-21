import { useState, useEffect } from "react";
import { debounce } from "lodash";
const useDebounce = (value: string, delay: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = debounce((value: string) => {
      setDebouncedValue(value);
    }, delay);
    handler(value);
    return () => {
      handler.cancel();
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
