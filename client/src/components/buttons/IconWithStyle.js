import React from "react";
import { IconButton } from "@chakra-ui/core";

const IconWithStyle = ({ icon, ...props }) => (
  <IconButton
    icon={icon}
    padding={1}
    variant="ghost"
    variantColor="purple"
    _focus={{ boxShadow: "0 0 0 3px #76598c" }}
    _active={{ bg: "purple.400" }}
    {...props}
  />
);

export default IconWithStyle;
