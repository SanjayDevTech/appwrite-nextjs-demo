import { Client, ID, Storage } from "appwrite";
import { useMemo } from "react";
import { wrap } from "./utils";

export default function useBucket(client: Client, bucketId: string) {
  const storage = useMemo(() => {
    return new Storage(client);
  }, [client]);

  async function create(data: File) {
    return wrap(async () => {
      return storage.createFile(bucketId, ID.unique(), data);
    });
  }

  function getFile(fileId: string) {
    return storage.getFileView(bucketId, fileId);
  }

  return {
    create,
    getFile,
  };
}
