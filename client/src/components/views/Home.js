import React from "react";
import { Flex } from "@chakra-ui/core";

import Books from "./Books";
import Loading from "../loading/Loading";
import UserContext from "../contexts/UserContext";
import useUser from "../hooks/useUser";
import useAccessToken from "../hooks/useAccessToken";

const Home = () => {
  const { token, authError } = useAccessToken() || {};

  const { data, error, isFetching } = useUser(token);

  if (authError) throw new Error(authError);

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
          <>{authError && <p>Please log in to access this page.</p>}</>
        </>
      )}
    </Flex>
  );
};

export default Home;
