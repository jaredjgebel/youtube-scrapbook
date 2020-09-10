import React from "react";
import { CircularProgress, Flex } from "@chakra-ui/core";

const Loading = () => (
  <Flex
    minHeight="100vh"
    minWidth="100vw"
    alignItems="center"
    justifyContent="center"
  >
    <CircularProgress isIndeterminate color="purple" size="100px" />
  </Flex>
);

export default Loading;
