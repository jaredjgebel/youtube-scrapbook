import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/core";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const [user, setUser] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await getAccessTokenSilently();

        const response = await fetch(
          `${apiUrl}/api/v1/users/5f48590c3f5db678fc503678`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        return await response.json();
      } catch (error) {
        console.log(error);
      }
    };

    let userData;
    const fetchData = async () => {
      userData = await getUser();
      setUser(userData);
    };

    fetchData();
  }, []);

  return (
    <Flex direction="column">
      <p>Home</p>
      {user && (
        <Flex direction="column">
          <p>
            {user.user.firstName} {user.user.lastName}
          </p>
        </Flex>
      )}
    </Flex>
  );
};

export default Home;
