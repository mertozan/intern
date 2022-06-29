import React from "react";
import { Button, Flex, Input, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { useToast } from "@chakra-ui/react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const toast = useToast();

  const onSubmit = (e) => {
    e.preventDefault();
    api
      .post("/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify(res.data));
          toast({
            title: "Giriş başarılı",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          navigate("/admin");
        }
      })
      .catch((err) => {
        toast({
          title: "Yanlış kullanıcı adı veya şifre",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <div>
      <Text>Giris yap</Text>
      <form onSubmit={onSubmit}>
        <VStack spacing={5} mt="10">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Eposta"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Şifre"
          />
          <Flex w="full" justifyContent={"flex-end"}>
            <Button type="submit">Gönder</Button>
          </Flex>
        </VStack>
      </form>
    </div>
  );
}

export default Login;
