import { Account, Client, Databases } from "appwrite";
import { useMemo } from "react";

export default function useClient(
  host: string,
  projectId: string,
  ssl?: boolean
): Client {
  const client = useMemo(() => {
    return new Client()
      .setEndpoint(`http${ssl ? "s" : ""}://${host}/v1`)
      .setProject(projectId);
  }, [host, projectId]);

  return client;
}
