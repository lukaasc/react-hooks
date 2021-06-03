import { useCallback, useState } from "react";

const useDebounce = <P extends unknown[]>(
  fn: (...args: P) => void,
  duration: number = 500
) => {
  const [timer, setTimer] = useState(null);

  return useCallback(
    (...args: P) => {
      clearTimeout(timer);

      const timeout = setTimeout(() => fn(...args), duration);

      setTimer(timeout);
    },
    [duration, fn, timer]
  );
};

export default useDebounce;
