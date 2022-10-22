import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { IPost } from "./types";

export default function Post(props: {
  post: IPost;
  getImage: (fileId: string) => URL;
}) {
  const { post } = props;
  const formattedDate = useMemo(
    () =>
      new Date(post.$createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "2-digit",
      }),
    [post]
  );

  const imageUrl = useMemo(() => props.getImage(post.image), [post]);

  return (
    <Grid
      w={300}
      h={"min-content"}
      templateAreas={`
    "content content content"
    "author spacer date"
    `}
      gridTemplateColumns="1fr 1fr 0.6fr"
      p={2}
      shadow="md"
      borderWidth="1px"
      borderRadius="5%"
    >
      <GridItem area={"content"}>
        <Flex direction={"column"}>
          <Image
            w={300}
            h={300}
            objectFit={"cover"}
            objectPosition={"center"}
            src={imageUrl.toString()}
          />
          <Text>{post.content}</Text>
        </Flex>
      </GridItem>
      <GridItem area={"author"}>
        <Text fontSize={"xs"}>{post.author}</Text>
      </GridItem>
      <GridItem area={"spacer"} />
      <GridItem area={"date"}>
        <Text fontSize={"xs"}>{formattedDate}</Text>
      </GridItem>
    </Grid>
  );
}
