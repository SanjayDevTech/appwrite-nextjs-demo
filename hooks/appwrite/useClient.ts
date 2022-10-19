import { Account, Client, Databases } from "appwrite";
import { useMemo } from "react";

export default function useClient(host: string, projectId: string): Client {
  const client = useMemo(() => {
    return new Client().setEndpoint(`https://${host}/v1`).setProject(projectId);
  }, [host, projectId]);

  return client;
}
