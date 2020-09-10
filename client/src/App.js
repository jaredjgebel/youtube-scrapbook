import React from "react";
import { Route, Switch } from "react-router-dom";
import { Flex } from "@chakra-ui/core";
import { useAuth0 } from "@auth0/auth0-react";

import PrivateRoute from "./auth/PrivateRoute";
import LoginButton from "./components/buttons/LoginButton";
import LogoutButton from "./components/buttons/LogoutButton";
import FrontPage from "./components/views/FrontPage";
import Home from "./components/views/Home";
import Profile from "./components/views/Profile";
import Loading from "./components/views/Loading";

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <Flex>
      {isLoading ? (
        <Loading />
      ) : (
        <Flex direction="column">
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}

          <Switch>
            <Route path="/" exact component={FrontPage} />
            <PrivateRoute path="/books" component={Home} />
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </Flex>
      )}
    </Flex>
  );
};

export default App;
