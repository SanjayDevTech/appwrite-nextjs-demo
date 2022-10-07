export interface IPost {
  id: string;
  content: string;
  image?: string;
  createdAt: Date;
  author: string;
}

export enum ResultState {
  Idle = "idle",
  Loading = "loading",
  Success = "success",
  Error = "error",
}
