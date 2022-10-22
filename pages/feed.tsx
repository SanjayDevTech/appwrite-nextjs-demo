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
import { useEffect, useMemo, useState } from "react";
import MyHead from "../components/head";
import Post from "../components/post";
import { IPost, ResultState } from "../components/types";
import useDebounce from "../hooks/useDebounce";
import useInput from "../hooks/useInput";
import AddPost from "../components/addPost";
import useDelay from "../hooks/useDelay";
import { useRouter } from "next/router";
import { IResultError } from "../hooks/appwrite/types";
import { AppwriteException, ID, Query } from "appwrite";
import useAppwrite from "../hooks/appwrite/useAppwrite";

export default function Feed() {
  const [search, handleSearch] = useInput("");
  const debouncedValue = useDebounce(search, 600);
  const [resultState, setResultState] = useState(ResultState.Idle);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();
  const execute = useDelay(3000);

  const [account, collection, bucket] = useAppwrite();

  const [posts, setPosts] = useState<IPost[]>([]);

  const isReady =
    !account.loading && account.user !== null && account.error === null;

  useEffect(() => {
    if (!account.loading && !account.user) {
      router.push("/auth");
    }
  }, [account.user, account.loading]);

  useEffect(() => {
    if (!isReady) return;
    fetchPosts();
  }, [debouncedValue, isReady]);

  const fetchPosts = async () => {
    setResultState(ResultState.Loading);
    const queries = [];
    if (debouncedValue) {
      queries.push(Query.search("content", debouncedValue));
    }
    queries.push(Query.limit(100));
    const [posts, error] = await collection.query(queries);
    if (posts) {
      setPosts(
        posts.documents.map((t) => ({
          ...t,
          created: new Date(t.created),
        })) as unknown as IPost[]
      );
      setResultState(ResultState.Success);
    }
    if (error) {
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
    imageFile: File;
  }): Promise<IResultError<boolean>> => {
    const [file, error] = await bucket.create(post.imageFile);
    if (error) {
      return [false, error];
    }
    const [result, error2] = await collection.create({
      content: post.content,
      image: file.$id,
      author: account.user?.name,
    });
    if (error2) {
      return [false, error2];
    }
    fetchPosts();
    return [true, null];
  };

  if (account.loading) return <Text>Loading...</Text>;

  if (!account.user) {
    return <></>;
  }

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
        {posts.map((p, i) => (
          <Post key={p.$id} post={p} getImage={bucket.getFile} />
        ))}
      </SimpleGrid>
    </Flex>
  );
}
