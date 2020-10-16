import React from "react";
import { IconButton } from "@chakra-ui/core";

const IconWithStyle = ({ icon, ...props }) => (
  <IconButton
    icon={icon}
    fontSize="18px"
    color="purple.900"
    bg="purple.100"
    _hover={{ bg: "purple.200" }}
    _focus={{ boxShadow: "0 0 0 3px #76598c" }}
    _active={{ bg: "purple.400" }}
    {...props}
  />
);

export default IconWithStyle;
