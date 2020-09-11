import React from "react";
import { Button, PseudoBox } from "@chakra-ui/core";

const ButtonWithStyle = (props) => (
  <PseudoBox
    as={Button}
    fontSize={["20px", "20px", "20px", "30px"]}
    padding={[5, 5, 5, 8]}
    color="purple.900"
    bg="purple.100"
    _hover={{ bg: "purple.200" }}
    _focus={{ boxShadow: "0 0 0 3px #76598c" }}
    {...props}
  />
);

export default ButtonWithStyle;
