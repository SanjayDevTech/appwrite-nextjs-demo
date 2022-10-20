import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, CheckIcon, SpinnerIcon, UnlockIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import MyHead from "../components/head";
import Post from "../components/post";
import { ResultState } from "../components/types";
import useDebounce from "../hooks/useDebounce";
import useInput from "../hooks/useInput";
import AddPost from "../components/addPost";
import useDelay from "../hooks/useDelay";
import { useRouter } from "next/router";
import { IResultError } from "../hooks/appwrite/types";
import { AppwriteException } from "appwrite";
import useAppwrite from "../hooks/appwrite/useAppwrite";

export default function Feed() {
  const [search, handleSearch] = useInput("");
  const debouncedValue = useDebounce(search, 600);
  const [resultState, setResultState] = useState(ResultState.Idle);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();
  const execute = useDelay(3000);

  const [account] = useAppwrite();

  useEffect(() => {
    fetchPosts();
  }, [debouncedValue]);

  const fetchPosts = async () => {
    setResultState(ResultState.Loading);
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?title=${debouncedValue}`
      );
      const data = await res.json();
      setResultState(ResultState.Success);
    } catch (error) {
      setResultState(ResultState.Error);
    }
  };

  const renderStatus = () => {
    switch (resultState) {
      case ResultState.Idle:
        return null;
      case ResultState.Loading:
        return <SpinnerIcon />;
      case ResultState.Success:
        return <CheckIcon color="green.500" />;
      case ResultState.Error:
        return <CheckIcon color="red.500" />;
    }
  };

  const onLogoutClick = async () => {
    try {
      await account.operations.logout();
      return true;
    } catch (e) {
      return false;
    }
  };

  const onPost = async (post: {
    content: string;
    imageFile: File | null;
  }): Promise<IResultError<boolean>> => {
    await execute();
    return [false, new AppwriteException("Error")];
  };

  return (
    <Flex w={"100%"} h={"100%"} direction="column">
      <MyHead title="Feed" />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <AddPost onClose={onClose} onPost={onPost} />
        </ModalContent>
      </Modal>
      <Flex bg={"gray.300"} justify={"center"} p={5} align={"center"}>
        <IconButton
          title="Logout"
          onClick={async () => {
            const isSuccess = await onLogoutClick();
            if (isSuccess) {
              router.push("/auth");
            } else {
              toast({
                title: "Logout failed",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }
          }}
          aria-label={"logout"}
          icon={<UnlockIcon />}
        />
        <Box flexGrow={1} />
        <InputGroup w={"300px"} bg={"white"}>
          <Input value={search} onChange={handleSearch} placeholder="Search" />
          <InputRightElement>{renderStatus()}</InputRightElement>
        </InputGroup>
        <Box flexGrow={1} />
        <IconButton
          bg={"red.500"}
          title="Add Post"
          aria-label="Add post"
          onClick={onOpen}
          icon={<AddIcon color="white" />}
        />
      </Flex>
      <SimpleGrid
        overflowX={"auto"}
        p={10}
        columns={4}
        spacing={10}
        flexWrap="wrap"
        w={"100%"}
        h={"100%"}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <Post
            key={i}
            post={{
              id: "1",
              author: "John Doe",
              content: "g",
              createdAt: new Date(),
              image: "https://picsum.photos/200/300",
            }}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
}
