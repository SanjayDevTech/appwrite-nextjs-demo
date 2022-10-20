import {
  Box,
  Flex,
  Tab,
  Text,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import MyHead from "../components/head";
import Login from "../components/login";
import { IResultError } from "../hooks/appwrite/types";
import useAppwrite from "../hooks/appwrite/useAppwrite";
import useDelay from "../hooks/useDelay";

export default function AuthPage() {
  const execute = useDelay(5000);

  const [account] = useAppwrite();
  const router = useRouter();

  useEffect(() => {
    if (!account.loading && account.user) {
      router.push("/feed");
    }
  }, [account.user, account.loading]);

  const onLoginClick = async (
    email: string,
    password: string
  ): Promise<IResultError<boolean>> => {
    const [session, error] = await account.operations.login(email, password);
    return [session !== null, error];
  };

  const onRegisterClick = async (
    email: string,
    password: string
  ): Promise<IResultError<boolean>> => {
    const [session, error] = await account.operations.register(email, password);
    return [session !== null, error];
  };

  if (account.loading) return <Text>Loading...</Text>;

  if (account.user) {
    return <></>;
  }

  return (
    <Flex
      w={"100%"}
      h={"100%"}
      direction="column"
      align="center"
      justify="center"
    >
      <MyHead title="Auth" />
      <Text fontSize="4xl" fontWeight="bold" mb="4">
        Social Media
      </Text>
      <Box w={"300px"} shadow="md" borderWidth="1px">
        <Tabs>
          <TabList>
            <Tab>Login</Tab>
            <Tab>Register</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login onSubmit={onLoginClick} text="Login" />
            </TabPanel>
            <TabPanel>
              <Login onSubmit={onRegisterClick} text="Register" />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
}
