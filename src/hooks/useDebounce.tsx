import { useState, useEffect } from "react";

function useDebounce(value: any, delay = 300) {
  const [debounce, setDebounce] = useState(value);
  useEffect(() => {
    const handle = setTimeout(() => {
      setDebounce(value);
    }, delay);

    return () => {
      clearTimeout(handle);
    };
  }, [delay, value]);

  return debounce;
}
export default useDebounce;
