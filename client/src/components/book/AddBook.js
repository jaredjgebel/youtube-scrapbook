import React from "react";
import { Flex, useDisclosure } from "@chakra-ui/core";
import AddButton from "../buttons/AddButton";
import AddBookModal from "../forms/book/AddBookModal";

const AddBook = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex alignItems="center" justifyContent="center" paddingY={8}>
      <AddButton ariaLabel="Add new book" onClick={onOpen} />
      <AddBookModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default AddBook;
