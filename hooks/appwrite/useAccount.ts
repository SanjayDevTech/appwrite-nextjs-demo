import { Account, Client, ID, Models } from "appwrite";
import { useState, useEffect, useMemo } from "react";
import { IAccountOps } from "./types";
import { wrap } from "./utils";

export default function useAccount(client: Client): IAccountOps {
  const account = useMemo(() => {
    return new Account(client);
  }, [client]);

  const [user, setUser] = useState<Models.Account<Models.Preferences> | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const [user, error] = await getAccount();
      if (error) {
        setError(error);
      } else if (user) {
        setUser(user);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  async function register(email: string, password: string, name?: string) {
    return wrap(() => {
      return account.create(email, password, name);
    });
  }

  async function login(email: string, password: string) {
    return wrap(() => account.createEmailSession(email, password));
  }

  async function logout() {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      setError(error);
    }
  }

  async function getAccount() {
    return wrap(() => account.get());
  }

  return { user, loading, error, operations: { register, login, logout } };
}
