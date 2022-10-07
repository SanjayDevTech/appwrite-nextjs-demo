import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Textarea,
  useBoolean,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import useInput from "../hooks/useInput";

export default function AddPost(props: {
  onClose: () => void;
  onPost: (post: { content: string; imageFile: File | null }) => void;
}) {
  const { onClose, onPost } = props;
  const [content, handleContent] = useInput("");
  const [isError, errorOps] = useBoolean(false);

  const [file, setFile] = useState<File | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <ModalHeader>Add post</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form>
          <FormControl isInvalid={isError}>
            <FormLabel>Add Content</FormLabel>
            <Textarea value={content} onChange={handleContent} />
            <FormErrorMessage>
              Content must be at least 10 characters long
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel>Add Image</FormLabel>
            <Button
              onClick={() => {
                inputFileRef.current?.click();
              }}
            >
              Choose Image
            </Button>
            {file && (
              <Image
                w={200}
                h={200}
                objectFit={"contain"}
                src={URL.createObjectURL(file)}
              />
            )}
            <Input
              ref={inputFileRef}
              type={"file"}
              accept={"image/*"}
              onChange={(e) => setFile(e.target.files[0])}
              display={"none"}
            />
          </FormControl>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button
          colorScheme={"green"}
          mr={3}
          onClick={() => {
            if (content.length < 10) {
              errorOps.on();
            } else {
              onPost({ content, imageFile: file });
              onClose();
            }
          }}
        >
          Post
        </Button>
        <Button colorScheme={"blue"} mr={3} onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </>
  );
}
