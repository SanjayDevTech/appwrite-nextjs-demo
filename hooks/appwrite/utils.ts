import { IResultError } from "./types";

export async function wrap<T>(
  fn: () => Promise<T> | T
): Promise<IResultError<T>> {
  let result: T | null = null;
  let error: any | null = null;
  try {
    result = await fn();
  } catch (e) {
    error = e;
  }
  return [result, error];
}
