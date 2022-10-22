import { Models, Databases } from "appwrite";
import { IAccountOps, IBucketOps, ICollectionOps } from "./types";
import useAccount from "./useAccount";
import useBucket from "./useBucket";
import useClient from "./useClient";
import useCollection from "./useCollection";

export default function useAppwrite(): [
  IAccountOps,
  ICollectionOps,
  IBucketOps
] {
  const client = useClient(
    process.env.NEXT_PUBLIC_APPWRITE_HOST,
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
    process.env.NEXT_PUBLIC_APPWRITE_SSL === "true"
  );

  const account = useAccount(client);
  const collection = useCollection(
    client,
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION
  );
  const bucket = useBucket(client, process.env.NEXT_PUBLIC_APPWRITE_BUCKET);

  return [account, collection, bucket];
}
