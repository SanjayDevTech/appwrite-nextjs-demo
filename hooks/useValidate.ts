import { useState, useCallback, useMemo } from "react";

export default function useValidate(value: string, validate: (data: string) => boolean): boolean {
    const isOk = useMemo(() => validate(value), [value]);
    return value === "" || isOk;
}