import { Models } from "appwrite";

export type IResultError<T> = [T | null, any | null];

export interface IAccountOps {
  user: Models.Account<Models.Preferences> | null;
  loading: boolean;
  error: string | null;
  operations: {
    register: (
      email: string,
      password: string,
      name?: string
    ) => Promise<IResultError<Models.Account<Models.Preferences>>>;
    login: (
      email: string,
      password: string
    ) => Promise<IResultError<Models.Session>>;
    logout: () => Promise<void>;
  };
}

export interface ICollectionOps {
  query: (
    queries?: string[]
  ) => Promise<IResultError<Models.DocumentList<Models.Document>>>;
  create: (
    data: any,
    documentId?: string
  ) => Promise<IResultError<Models.Document>>;
  read: (documentId: string) => Promise<IResultError<Models.Document>>;
  update: (
    documentId: string,
    data: any
  ) => Promise<IResultError<Models.Document>>;
  remove: (documentId: string) => Promise<IResultError<{}>>;
}
