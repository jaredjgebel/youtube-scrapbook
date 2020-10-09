import React from "react";
import { Route, Switch } from "react-router-dom";
import { Flex } from "@chakra-ui/core";
import { useAuth0 } from "@auth0/auth0-react";

import PrivateRoute from "./auth/PrivateRoute";
import FrontPage from "./components/views/FrontPage";
import Home from "./components/views/Home";
import Profile from "./components/views/Profile";
import Loading from "./components/views/Loading";

const App = () => {
  const { isLoading } = useAuth0();

  return (
    <Flex backgroundColor="#f0e9e7">
      {isLoading ? (
        <Loading />
      ) : (
        <Flex
          direction="column"
          justifyContent="center"
          width="100%"
          minH="100vh"
        >
          <Switch>
            <PrivateRoute path="/books" component={Home} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/" exact component={FrontPage} />
          </Switch>
        </Flex>
      )}
    </Flex>
  );
};

export default App;
