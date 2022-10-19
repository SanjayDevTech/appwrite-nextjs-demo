import { Models, Databases } from "appwrite";
import { IAccountOps, ICollectionOps } from "./types";
import useAccount from "./useAccount";
import useClient from "./useClient";
import useCollection from "./useCollection";

export default function useAppwrite(): [IAccountOps, ICollectionOps] {
  const client = useClient(
    process.env.NEXT_PUBLIC_APPWRITE_HOST,
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT
  );

  const account = useAccount(client);
  const collection = useCollection(client, "database", "collection");

  return [account, collection];
}
