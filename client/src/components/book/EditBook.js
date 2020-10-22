import React from "react";
import { Box, useDisclosure } from "@chakra-ui/core";

import IconWithStyle from "../buttons/IconWithStyle";
import EditBookModal from "../forms/book/EditBookModal";
import DeleteBook from "../book/DeleteBook";

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

export default EditBook;
