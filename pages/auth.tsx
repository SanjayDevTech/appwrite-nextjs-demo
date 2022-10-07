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
import MyHead from "../components/head";
import Login from "../components/login";

export default function AuthPage() {
  return (
    <Flex w={"100%"} h={"100%"} direction="column" align="center" justify="center">
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
              <Login text="Login" />
            </TabPanel>
            <TabPanel>
              <Login text="Register" />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
}
