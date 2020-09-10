import React from "react";
import { Button, PseudoBox } from "@chakra-ui/core";

const ButtonWithStyle = (props) => (
  <PseudoBox
    as={Button}
    color="#493657"
    bg="#dbc7e9"
    _hover={{ bg: "purple.100" }}
    {...props}
  />
);

export default ButtonWithStyle;
