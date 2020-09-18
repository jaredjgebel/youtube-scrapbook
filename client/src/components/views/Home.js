import React, { useEffect, useState } from "react";
import { Flex, Heading, SimpleGrid } from "@chakra-ui/core";
import { useAuth0 } from "@auth0/auth0-react";

import Book from "../book/Book";
import AddButton from "../buttons/AddButton";

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
      <Heading as="h1" paddingBottom={[6, 6, 12, 16]}>
        Books
      </Heading>
      {user && (
        <SimpleGrid columns={[1, 1, 2, 3]} spacing={[6, 6, 8, 8]}>
          {user.books.map((book, i) => (
            <Book key={i} title={book.title} color="currentColor" />
          ))}
          <Flex alignItems="center" justifyContent="center">
            <AddButton />
          </Flex>
        </SimpleGrid>
      )}
      {error && (
        <p>Error loading your books, please refresh the page to try again.</p>
      )}
    </Flex>
  );
};

export default Home;
