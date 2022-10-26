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
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
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
