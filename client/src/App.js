import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Admin from "./pages/admin";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import { Container, Flex } from "@chakra-ui/react";
import Search from "./pages/search";

function App() {
  return (
    <Container maxW="container.sm" my="10">
      <Flex justifyContent={"space-between"} mb="10">
        <Link to="/" style={{ fontSize: "20px", fontWeight: "bold", color: "InfoText" }}>
          KKU STAJ
        </Link>
        <Link to="/search">Ara</Link>
      </Flex>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Container>
  );
}

export default App;
