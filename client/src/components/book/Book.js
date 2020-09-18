import React from "react";
import { Flex, Heading, Icon, PseudoBox } from "@chakra-ui/core";

import BookIcon from "../book/BookIcon";

const Book = ({ title }) => (
  <PseudoBox
    as={Flex}
    role="group"
    cursor="pointer"
    direction="column"
    alignItems="center"
    padding="15px 15px"
    tabIndex={0}
    borderRadius="5px"
    _focus={{
      boxShadow: "0 0 1px 4px #76598c",
      outline: "none",
    }}
    _active={{ backgroundColor: "#ceb7b1" }}
  >
    <BookIcon size={["72px", "84px", "96px", "110px"]} paddingBottom="12px" />
    <Heading
      as="h2"
      textAlign="center"
      fontSize={["20px", "20px", "24px", "28px"]}
    >
      {title}
    </Heading>
  </PseudoBox>
);

export default Book;
