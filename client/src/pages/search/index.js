import { Box, Button, Flex, Input, Text, VStack } from "@chakra-ui/react";
import React from "react";
import api from "../../api";
import Card from "../admin/Card";

function Search() {
  const [search, setSearch] = React.useState("");
  const [results, setResults] = React.useState([]);

  const handleSearch = (e) => {
    e.preventDefault();                                                     //sayfanın yenilenmesini engelleme
    api.get("/search/" + search).then((res) => setResults(res.data.data));  // apiden gelen arama sonucunu stateye kaydediyor. resulta kaydediyor
  };
  return (
    <VStack pt="10">
      <form onSubmit={handleSearch}>
        <Flex>
          <Input placeholder="Arama yap" value={search} onChange={(e) => setSearch(e.target.value)} /> 
          <Button type="submit">Ara</Button>
        </Flex>
      </form>

      <VStack spacing={6} pt="10">
        {results.map((result) => (                                           //apiye gelen arama sonucunu cardlar ile döndürüyor
          <Card submission={result} showMenu={false} />
        ))}
        {results.length === 0 && (
          <Box>
            <Text>Sonuç yok.</Text>
          </Box>
        )}
      </VStack>
    </VStack>
  );
}

export default Search;
