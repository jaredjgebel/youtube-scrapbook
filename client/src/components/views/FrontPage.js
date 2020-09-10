import React from "react";
import { Flex, Image } from "@chakra-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import Cover from "../../images/svg/cover.svg";

import LoginButton from "../buttons/LoginButton";
import LogoutButton from "../buttons/LogoutButton";
import SignupButton from "../buttons/SignupButton";

const FrontPage = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Flex
      className="front-page-container"
      direction="column"
      minHeight="100vh"
      minWidth="90vw"
      alignItems="center"
      justifyContent="space-around"
    >
      <Image
        src={Cover}
        alt="Youtube Scrapbook Cover Image"
        width="85%"
        maxWidth="900px"
        py={8}
      />
      {isAuthenticated ? (
        <LogoutButton />
      ) : (
        <Flex width="40%" justifyContent="space-around">
          <LoginButton />
          <SignupButton />
        </Flex>
      )}
    </Flex>
  );
};

export default FrontPage;
