import { Flex, Text } from "@chakra-ui/react";
import MyHead from "../components/head";

export default function Dashboard() {
    return (
        <Flex w={"100%"} h={"100%"} direction="column" align="center" justify="center">
        <MyHead title="Dashboard" />
        <Text fontSize="4xl" fontWeight="bold" mb="4">
            Dashboard
        </Text>
        </Flex>
    );
}