import React from "react";
import { IconButton, PseudoBox } from "@chakra-ui/core";

const AddButton = (props) => (
  <PseudoBox
    _focus={{
      boxShadow: "0 0 1px 4px #76598c",
      outline: "none",
    }}
    {...props}
  >
    <IconButton
      aria-label="Add book"
      icon="add"
      variant="outline"
      isRound
      color="purple.500"
      _focus={{ boxShadow: "0 0 1px 4px #76598c" }}
      size="lg"
    />
  </PseudoBox>
);

export default AddButton;
