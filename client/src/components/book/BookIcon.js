import React from "react";
import { Icon, PseudoBox } from "@chakra-ui/core";

const Book = (props) => {
  return (
    <PseudoBox
      as={Icon}
      role="img"
      name="book"
      color="purple.900"
      _hover={{ color: "purple.200" }}
      _focus={{ boxShadow: "0 0 0 3px #76598c" }}
      {...props}
    />
  );
};

export default Book;
