import { CheckIcon, WarningIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import useInput from "../hooks/useInput";
import useValidate from "../hooks/useValidate";

const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

export default function Login(props: ({text: string})) {
  const [email, handleEmail] = useInput("");
  const [password, handlePassword] = useInput("");
  const toast = useToast();

  const router = useRouter();

  const validateEmail = (value: string) => emailRegex.test(value);
  const validatePassword = (value: string) => passwordRegex.test(value);

  const isEmailValid = useValidate(email, validateEmail);
  const isPasswordValid = useValidate(password, validatePassword);

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (validateEmail(email) && validatePassword(password)) {
      router.push("/feed");
    } else {
      toast({
        title: "Invalid email or password",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  };

  const renderStatus = (value: string, isOk: boolean) => {
    switch (value) {
      case "":
        return null;
      default:
        return (
          <InputRightElement>
            {isOk ? (
              <CheckIcon color="green.500" />
            ) : (
              <WarningIcon color="red.500" />
            )}
          </InputRightElement>
        );
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <InputGroup>
          <Input
            value={email}
            autoComplete="off"
            onChange={handleEmail}
            type={"email"}
            name={"email"}
            placeholder={"Enter email address"}
          />
          {renderStatus(email, isEmailValid)}
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            autoComplete="off"
            value={password}
            onChange={handlePassword}
            type={"password"}
            name={"password"}
            placeholder={"Enter password"}
          />
          {renderStatus(password, isPasswordValid)}
        </InputGroup>
      </FormControl>
      <Button my={5} type="submit">
        {props.text}
      </Button>
    </form>
  );
}
