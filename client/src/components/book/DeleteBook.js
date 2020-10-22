import React from "react";
import { useDisclosure } from "@chakra-ui/core";

import IconWithStyle from "../buttons/IconWithStyle";
import DeleteBookModal from "../forms/book/DeleteBookModal";

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

export default DeleteBook;
