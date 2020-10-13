import React, { useState } from "react";
import { Flex } from "@chakra-ui/core";
import { useAuth0 } from "@auth0/auth0-react";

import Books from "./Books";
import Loading from "../views/Loading";
import UserContext from "../contexts/UserContext";
import useUser from "../hooks/useUser";

const Home = () => {
  const [token, setToken] = useState(null);
  const [authError, setAuthError] = useState(null);

  const { getAccessTokenSilently } = useAuth0();

  getAccessTokenSilently()
    .then((retrievedToken) => setToken(retrievedToken))
    .catch((err) => {
      setAuthError(err);
    });

  const { data, error, isFetching } = useUser(token);

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
    >
      {isFetching ? (
        <Loading />
      ) : (
        <>
          <>
            {data && data.user && (
              <UserContext.Provider value={data.user}>
                <Books books={data.user.books} />
              </UserContext.Provider>
            )}
          </>
          <>
            {error && (
              <p>
                Error loading your books, please refresh the page to try again.
              </p>
            )}
          </>
        </>
      )}
    </Flex>
  );
};

export default Home;
