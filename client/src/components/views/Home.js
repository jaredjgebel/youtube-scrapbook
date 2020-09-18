import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/core";
import { useAuth0 } from "@auth0/auth0-react";

import Books from "./Books";
import UserContext from "../contexts/UserContext";

const Home = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  const { getAccessTokenSilently } = useAuth0();

  let token;
  getAccessTokenSilently()
    .then((retrievedToken) => (token = retrievedToken))
    .catch((err) => setError(err));

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        const json = await response.json();

        if (json.error) {
          throw new Error(json.error);
        }

        setUser(json.user);
      } catch (error) {
        setError(error);
      }
    };

    getUser();
  }, [apiUrl, token]);

  return (
    <Flex
      direction="column"
      alignItems="center"
      minHeight="100vh"
      width={["300px", "480px", "650px", "900px"]}
      paddingTop={8}
    >
      {user && (
        <UserContext.Provider value={user}>
          <Books books={user.books} />
        </UserContext.Provider>
      )}

      {error && (
        <p>Error loading your books, please refresh the page to try again.</p>
      )}
    </Flex>
  );
};

export default Home;
