import React from "react";
import { Flex, Heading } from "@chakra-ui/core";

import BookIcon from "../book/BookIcon";

const Book = ({ title }) => (
  <Flex direction="column" alignItems="center" padding="15px 15px">
    <BookIcon size="60px" />
    <Heading as="h2" textAlign="center" fontSize="20px">
      {title}
    </Heading>
  </Flex>
);

export default Book;
