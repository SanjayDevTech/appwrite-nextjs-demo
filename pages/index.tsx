import { useRouter } from "next/router";
import { useEffect } from "react";
import { Text } from "@chakra-ui/react";
import useAppwrite from "../hooks/appwrite/useAppwrite";

export default function Home() {
  const [account] = useAppwrite();
  const router = useRouter();

  useEffect(() => {
    if (!account.loading) {
      if (account.user) {
        router.push("/feed");
      } else {
        router.push("/auth");
      }
    }
  }, [account.user, account.loading]);

  if (account.loading) return <Text>Loading...</Text>;

  return <></>;
}
