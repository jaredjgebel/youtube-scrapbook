import React from "react";
import { Flex, Heading, SimpleGrid } from "@chakra-ui/core";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Loading from "../loading/Loading";
import Pages from "./Pages";
import Book from "../book/Book";
import AddBook from "../book/AddBook";

const Books = ({ books }) => {
  const { path } = useRouteMatch();
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
              paddingTop={[8, 8, 4]}
              paddingBottom={[12, 12, 12, 16]}
            >
              <Heading as="h1" paddingY="3rem" fontSize="3xl">
                Books
              </Heading>

              <SimpleGrid columns={[1, 1, 1, 2]} spacing={[20, 8, 8, 8]}>
                {books &&
                  books.map((book, i) => (
                    <Book id={book._id} title={book.title} key={i} />
                  ))}

                <AddBook />
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
