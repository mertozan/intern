import { Box, Button, VStack } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";
import Card from "./Card";
import api from "../../api";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { socket } from "../../socket";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [submissions, setSubmissions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);
  const navigate = useNavigate();
  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  const fetchSubmissions = useCallback(() => {
    setLoading(true);

    api.get("/submissions").then(({ data }) => {
      setSubmissions(data.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchSubmissions();
    socket.on("connect", () => {
      console.log("connected id:", socket.id);
    });
    socket.on("submitted", (data) => {
      fetchSubmissions();
    });
    // return () => socket.disconnect();
  }, []);

  if (!localStorage.getItem("user")) {
    navigate("/login");
  }

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <Tabs index={tabIndex} onChange={handleTabsChange}>
        <TabList>
          <Tab>Hepsi</Tab>
          <Tab>Onaylananlar</Tab>
          <Tab>Reddelenler</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {loading && <div>Loading...</div>}
            <VStack spacing={4} mt={10}>
              {submissions?.map((submission) => (
                <Card key={submission.id} submission={submission} fetchSubmissions={fetchSubmissions} />
              ))}
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={4} mt={10}>
              {loading && <div>Loading...</div>}
              {submissions
                ?.filter((i) => i.status === 1)
                ?.map((submission) => (
                  <Card key={submission.id} submission={submission} fetchSubmissions={fetchSubmissions} />
                ))}
            </VStack>
          </TabPanel>
          <TabPanel>
            {loading && <div>Loading...</div>}
            <VStack spacing={4} mt={10}>
              {submissions
                ?.filter((i) => i.status === 2)
                ?.map((submission) => (
                  <Card key={submission.id} submission={submission} fetchSubmissions={fetchSubmissions} />
                ))}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Button onClick={logout} position={"fixed"} bottom="50px" right="50px">
        Cikis yap
      </Button>
    </div>
  );
}

export default Admin;
