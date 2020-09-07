import React from "react";
import { Route, Switch } from "react-router-dom";
import { Flex } from "@chakra-ui/core";

import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/buttons/LoginButton";
import LogoutButton from "./components/buttons/LogoutButton";
import FrontPage from "./components/views/FrontPage";
import Home from "./components/views/Home";

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <Flex>
      {isLoading ? (
        "Loading..."
      ) : (
        <Flex>
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}

          <Switch>
            <Route path="/" exact component={FrontPage} />
            <Route path="/books" component={Home} />
          </Switch>
        </Flex>
      )}
    </Flex>
  );
};

export default App;
