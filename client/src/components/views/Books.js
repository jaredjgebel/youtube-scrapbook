import React from "react";
import { Box, Flex, Heading, SimpleGrid, useDisclosure } from "@chakra-ui/core";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import AddButton from "../buttons/AddButton";
import Loading from "./Loading";
import Pages from "./Pages";
import IconWithStyle from "../buttons/IconWithStyle";
import Book from "../book/Book";
import AddBookModal from "../forms/AddBookModal";
import EditBookModal from "../forms/EditBookModal";
import DeleteBookModal from "../forms/DeleteBookModal";

const AddBook = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex alignItems="center" justifyContent="center" paddingY={8}>
      <AddButton ariaLabel="Add new book" onClick={onOpen} />
      <AddBookModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export const EditBook = ({ id, title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      className="edit-parent"
      position="absolute"
      width="50px"
      top="15px"
      right="0px"
    >
      <IconWithStyle
        icon="edit"
        isRound
        position="absolute"
        size={["lg"]}
        onClick={onOpen}
      />
      <EditBookModal
        isOpen={isOpen}
        onClose={onClose}
        currentTitle={title}
        id={id}
      />
      <DeleteBook id={id} />
    </Box>
  );
};

const DeleteBook = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconWithStyle
        icon="delete"
        isRound
        position="absolute"
        top="50px"
        size="lg"
        onClick={onOpen}
      />
      <DeleteBookModal isOpen={isOpen} onClose={onClose} id={id} />
    </>
  );
};

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
