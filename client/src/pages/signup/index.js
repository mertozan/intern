import React from "react";
import { Button, Flex, Input, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div>
      <Text>Kayit ol</Text>
      <form onSubmit={onSubmit}>
        <VStack spacing={5} mt="10">
          <Input type="email" placeholder="Eposta" />
          <Input type="password" placeholder="Şifre" />
          <Flex w="full" justifyContent={"flex-end"}>
            <Button type="submit">Gonder</Button>
          </Flex>
        </VStack>
      </form>
    </div>
  );
}

export default Login;
