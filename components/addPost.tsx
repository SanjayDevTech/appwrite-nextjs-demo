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
  useToast,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { IResultError } from "../hooks/appwrite/types";
import useInput from "../hooks/useInput";

export default function AddPost(props: {
  onClose: () => void;
  onPost: (post: {
    content: string;
    imageFile: File | null;
  }) => Promise<IResultError<boolean>>;
}) {
  const { onClose, onPost } = props;
  const [content, handleContent] = useInput("");
  const [loading, { on: onLoading, off: offLoading }] = useBoolean(false);
  const [isContentError, errorContentOps] = useBoolean(false);
  const [isFileError, errorFileOps] = useBoolean(false);

  const toast = useToast();

  const [file, setFile] = useState<File | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <ModalHeader>Add post</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form>
          <FormControl isInvalid={isContentError}>
            <FormLabel>Add Content</FormLabel>
            <Textarea value={content} onChange={handleContent} />
            <FormErrorMessage>
              Content must be at least 10 characters long
            </FormErrorMessage>
          </FormControl>
          <FormControl isDisabled={loading} isInvalid={isFileError}>
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
            <FormErrorMessage>Choose a file</FormErrorMessage>
          </FormControl>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button
          isLoading={loading}
          colorScheme={"green"}
          mr={3}
          onClick={async () => {
            errorContentOps.off();
            errorFileOps.off();
            if (content.length < 10) {
              errorContentOps.on();
            } else if (!file) {
              errorFileOps.on();
            } else {
              errorContentOps.off();
              errorFileOps.off();
              onLoading();
              const [isSuccess, error] = await onPost({
                content,
                imageFile: file,
              });
              offLoading();
              if (isSuccess) {
                onClose();
              }
              if (error) {
                toast({
                  title: "Error",
                  description: error.message,
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              }
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
