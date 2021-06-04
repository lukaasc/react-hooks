/**
 * Need update so it doesn't rely on copy-to-clipboard
 */

import copy from "copy-to-clipboard";
import { useEffect, useRef, useState } from "react";

type Options = Parameters<typeof copy>[1] & {
  duration?: number;
};

const isInputElement = (
  element: HTMLInputElement | HTMLElement
): element is HTMLInputElement => {
  return element instanceof HTMLInputElement;
};

const useClipboard = ({ duration = 3000, ...rest }: Options = {}) => {
  const [isCopied, setIsCopied] = useState(false);
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    if (!isCopied) return;

    const timeout = setTimeout(() => setIsCopied(false), duration);

    return () => clearTimeout(timeout);
  });

  return [
    isCopied,
    () => {
      if (isInputElement(ref.current))
        return setIsCopied(copy(ref.current?.value, rest));

      return setIsCopied(copy(ref.current?.textContent, rest));
    },
    ref,
  ] as const;
};

export default useClipboard;
