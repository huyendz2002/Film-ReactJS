import { useEffect, useState } from "react";

function useDebounce(initialValue, delay = 1000) {
  const [debounceValue, setDebounceValue] = useState("");
  useEffect(() => {
    const time = setTimeout(() => {
      setDebounceValue(initialValue);
    }, delay);
    return () => {
      clearTimeout(time);
    };
  }, [initialValue, delay]);
  return debounceValue;
}
export default useDebounce;
