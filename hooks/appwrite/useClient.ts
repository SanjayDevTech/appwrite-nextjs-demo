import { Account, Client, Databases } from "appwrite";
import { useMemo } from "react";

function normalizeEndpoint(
  endpoint: string,
): string {
  if (endpoint.endsWith("/")) {
    return endpoint.substring(0, endpoint.length - 1);
  }
  return endpoint;
}

export default function useClient(
  endpoint: string,
  projectId: string
): Client {
  const client = useMemo(() => {
    return new Client()
      .setEndpoint(normalizeEndpoint(endpoint))
      .setProject(projectId);
  }, [endpoint, projectId]);

  return client;
}
