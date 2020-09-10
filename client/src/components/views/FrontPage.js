import React from "react";
import { Flex, Image } from "@chakra-ui/core";
import Cover from "../../images/svg/cover.svg";

const FrontPage = () => (
  <Flex>
    <Image src={Cover} alt="Youtube Scrapbook Cover Image" />
  </Flex>
);

export default FrontPage;
