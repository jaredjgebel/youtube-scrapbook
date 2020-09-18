import React from "react";
import { Flex, Grid, Image, Heading } from "@chakra-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

import LoginButton from "../buttons/LoginButton";
import LogoutButton from "../buttons/LogoutButton";
import SignupButton from "../buttons/SignupButton";
import ButtonWithStyle from "../buttons/ButtonWithStyle";
import ObjectPositionFitQuery from "../utils/ObjectPositionFitQuery";
import Cover from "../../images/svg/cover.svg";

const FrontPage = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Grid
      className="front-page-container"
      height="100vh"
      maxH="100vh"
      width="100%"
      gridTemplateColumns="repeat(6, 1fr)"
      gridTemplateRows="repeat(6, 1fr)"
      gridTemplateAreas={`"lt-image lt-image lt-image lt-image lt-image lt-image"
      "lt-image lt-image lt-image lt-image lt-image lt-image"
      "lt-image lt-image lt-image lt-image lt-image lt-image"
      "lt-image lt-image lt-image lt-image lt-image lt-image"
      "lt-heading lt-heading lt-heading lt-heading lt-heading lt-heading"
      "lt-buttons lt-buttons lt-buttons lt-buttons lt-buttons lt-buttons"`}
    >
      <Flex
        gridArea="lt-image"
        alignItems="stretch"
        justifyContent="space-around"
      >
        <ObjectPositionFitQuery>
          <Image
            src={Cover}
            alt="Youtube Scrapbook Cover Image"
            objectFit="inherit"
            objectPosition="inherit"
            maxH="100%"
            maxW="100%"
          />
        </ObjectPositionFitQuery>
      </Flex>

      <Flex gridArea="lt-heading" alignItems="center" justifyContent="center">
        <Heading
          as="h1"
          fontSize={["32px", "32px", "32px", "48px"]}
          color="gray.700"
        >
          My Youtube Scrapbook
        </Heading>
      </Flex>

      {isAuthenticated ? (
        <Flex
          alignItems="center"
          justifyContent="space-around"
          gridArea="lt-buttons"
        >
          <Link to="/books">
            <ButtonWithStyle>Enter</ButtonWithStyle>
          </Link>
          <LogoutButton />
        </Flex>
      ) : (
        <Flex
          alignItems="center"
          justifyContent="space-around"
          gridArea="lt-buttons"
        >
          <LoginButton />
          <SignupButton />
        </Flex>
      )}
    </Grid>
  );
};

export default FrontPage;
