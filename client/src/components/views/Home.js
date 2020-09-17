import React, { useEffect, useState } from "react";
import { Flex, Heading } from "@chakra-ui/core";
import { useAuth0 } from "@auth0/auth0-react";

import Book from "../book/Book";

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
    <Flex direction="column" minHeight="100vh">
      <Heading as="h1">Books</Heading>
      {user && (
        <Flex direction="column">
          {user.books.map((book, i) => (
            <div key={i}>
              <Book />
              <Heading as="h2" fontSize="20px" key={i}>
                {book.title}
              </Heading>
            </div>
          ))}
        </Flex>
      )}
      {error && (
        <p>Error loading your books, please refresh the page to try again.</p>
      )}
    </Flex>
  );
};

export default Home;
