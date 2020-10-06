import React from "react";
import { Flex, Heading, SimpleGrid } from "@chakra-ui/core";
import { useRouteMatch, Link, Switch, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Book from "../book/Book";
import AddButton from "../buttons/AddButton";
import Loading from "./Loading";
import Pages from "./Pages";

const Books = ({ books }) => {
  const { url, path } = useRouteMatch();
  const { isLoading } = useAuth0();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Switch>
          <Route exact path={path}>
            <Flex
              direction="column"
              alignItems="center"
              minHeight="100vh"
              paddingTop={8}
            >
              <Heading as="h1" paddingBottom={[6, 6, 12, 16]}>
                Books
              </Heading>

              <SimpleGrid columns={[1, 1, 2, 3]} spacing={[6, 6, 8, 8]}>
                {books.map((book, i) => (
                  <Link to={`${url}/${book.id}`} key={i}>
                    <Book title={book.title} color="currentColor" />
                  </Link>
                ))}

                <Flex alignItems="center" justifyContent="center">
                  <AddButton />
                </Flex>
              </SimpleGrid>
            </Flex>
          </Route>

          <Route path={`${path}/:id`} component={Pages} />
        </Switch>
      )}
    </>
  );
};

export default Books;
