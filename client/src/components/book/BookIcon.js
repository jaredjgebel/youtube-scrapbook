import React from "react";
import { Icon, PseudoBox } from "@chakra-ui/core";

const BookIcon = (props) => {
  return (
    <PseudoBox _groupHover={{ color: "purple.500" }}>
      <Icon name="book" color="currentColor" {...props} />
    </PseudoBox>
  );
};

export default BookIcon;
