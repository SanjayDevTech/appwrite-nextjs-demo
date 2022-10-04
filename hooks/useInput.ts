import { useState, useCallback } from "react";

export default function useInput<T>(initial: T): [T, (e: React.ChangeEvent<HTMLInputElement>) => void] {
    const [value, setValue] = useState<T>(initial);
    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value as T);
    }, []);
    return [value, onChange];
}