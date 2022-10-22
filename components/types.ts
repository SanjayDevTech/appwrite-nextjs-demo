export interface IPost {
  $id: string;
  $createdAt: string;
  content: string;
  image: string;
  author: string;
}

export enum ResultState {
  Idle = "idle",
  Loading = "loading",
  Success = "success",
  Error = "error",
}
