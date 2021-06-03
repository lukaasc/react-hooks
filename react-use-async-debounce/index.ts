import { useCallback, useState } from "react";

export const useAsyncDebounce = <
  P extends unknown[],
  R extends PromiseLike<any>
>(
  fn: (...args: P) => R,
  duration: number = 500
) => {
  const [timer, setTimer] = useState(null);

  return useCallback(
    (...args: P) => {
      clearTimeout(timer);

      return new Promise<R extends PromiseLike<infer U> ? U : unknown>(
        (resolve) => {
          const timeout = setTimeout(() => {
            const result = fn(...args);

            resolve(result);
          }, duration);

          setTimer(timeout);
        }
      );
    },
    [duration, fn, timer]
  );
};

export default useAsyncDebounce;
