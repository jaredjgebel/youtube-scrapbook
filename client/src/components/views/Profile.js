import React from "react";
import { Flex, Image, Heading, Text } from "@chakra-ui/core";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user } = useAuth0();
  const { name, picture, email } = user;

  return (
    <Flex direction="column">
      <Heading as="h1">Profile</Heading>
      <Image src={picture} />
      <Heading as="h2">{name}</Heading>
      <Text>{email}</Text>
      {JSON.stringify(user, null, 2)}
    </Flex>
  );
};

export default Profile;
