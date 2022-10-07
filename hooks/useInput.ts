import { useState, useCallback } from "react";

export default function useInput<T>(
  initial: T
): [T, (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void] {
  const [value, setValue] = useState<T>(initial);
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(e.target.value as T);
    },
    []
  );
  return [value, onChange];
}