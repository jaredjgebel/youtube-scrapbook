import React from "react";
import {
  Box,
  Flex,
  Heading,
  PseudoBox,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/core";
import { useRouteMatch, Link, Switch, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import BookIcon from "../book/BookIcon";
import AddButton from "../buttons/AddButton";
import Loading from "./Loading";
import Pages from "./Pages";
import IconWithStyle from "../buttons/IconWithStyle";
import AddBookModal from "../forms/AddBookModal";
import EditBookModal from "../forms/EditBookModal";

const AddBook = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex alignItems="center" justifyContent="center" paddingY={4}>
      <AddButton ariaLabel="Add new book" onClick={onOpen} />
      <AddBookModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

const EditBook = ({ id, title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      className="relative-position"
      position="relative"
      left="90%"
      bottom="100%"
      width="50px"
    >
      <IconWithStyle icon="edit" isRound position="absolute" onClick={onOpen} />
      <EditBookModal
        isOpen={isOpen}
        onClose={onClose}
        currentTitle={title}
        id={id}
      />

      <IconWithStyle icon="delete" isRound position="absolute" top="45px" />
    </Box>
  );
};

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
              paddingTop={[8, 8, 4]}
              paddingBottom={[6, 6, 12, 16]}
            >
              <Heading as="h1" paddingBottom="2rem">
                Books
              </Heading>

              <SimpleGrid columns={[1, 1, 2]} spacing={[8, 8, 8, 8]}>
                {books.map((book, i) => (
                  <Box key={i} marginX={[6, 24, 24, 20]} marginY={2}>
                    <Flex
                      alignItems="center"
                      justifyContent="center"
                      height="100%"
                      width="100%"
                    >
                      <PseudoBox
                        as={Flex}
                        role="group"
                        cursor="pointer"
                        alignItems="center"
                        justifyContent="center"
                        tabIndex={0}
                        paddingX={[4, 12, 8]}
                        paddingY={3}
                        borderRadius="5px"
                        _focus={{
                          boxShadow: "0 0 1px 4px #76598c",
                          outline: "none",
                        }}
                        _active={{ backgroundColor: "#ceb7b1" }}
                      >
                        <Link to={`${url}/${book._id}`}>
                          <Flex
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <BookIcon
                              size={["72px", "84px", "96px", "110px"]}
                              paddingBottom="12px"
                            />
                            <Heading
                              as="h2"
                              textAlign="center"
                              fontSize={["20px", "20px", "24px", "28px"]}
                            >
                              {book.title}
                            </Heading>
                          </Flex>
                        </Link>
                      </PseudoBox>
                    </Flex>

                    <EditBook title={book.title} id={book._id} />
                  </Box>
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
