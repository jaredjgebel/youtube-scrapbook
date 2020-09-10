import React from "react";
import { Button, PseudoBox } from "@chakra-ui/core";

const ButtonWithStyle = (props) => (
  <PseudoBox
    as={Button}
    color="#493657"
    bg="#dbc7e9"
    border="1px solid #493657"
    _hover={{ bg: "purple.100" }}
    _focus={{ boxShadow: "0 0 0 3px #887098" }}
    {...props}
  />
);

export default ButtonWithStyle;
