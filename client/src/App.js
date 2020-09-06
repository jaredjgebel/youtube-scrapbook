import React from "react";
import { Flex } from "@chakra-ui/core";

import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/buttons/LoginButton";
import LogoutButton from "./components/buttons/LogoutButton";

function App() {
  const { isAuthenticated } = useAuth0();

  return <Flex>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</Flex>;
}

export default App;
