import React from "react";
import { Box, Flex, Heading, PseudoBox } from "@chakra-ui/core";
import { Link, useRouteMatch } from "react-router-dom";

import BookIcon from "./BookIcon";
import { EditBook } from "../views/Books";

const Book = ({ title, id }) => {
  const { url } = useRouteMatch();
  return (
    <Box marginX={[6, 24, 6, 20]} marginY={2}>
      <Flex
        alignItems="center"
        justifyContent="center"
        height="100%"
        width="100%"
      >
        <PseudoBox
          as={Flex}
          role="group"
          cursor="pointer"
          alignItems="center"
          justifyContent="center"
          tabIndex={0}
          height="100%"
          width="100%"
          paddingX={[4, 8]}
          paddingY={[3, 8]}
          borderRadius="5px"
          _focus={{
            boxShadow: "0 0 1px 4px #76598c",
            outline: "none",
          }}
          _active={{ backgroundColor: "#ceb7b1" }}
        >
          <Box width="100%" height="100%">
            <Link to={`${url}/${id}`} width="100%" height="100%">
              <Flex
                direction="column"
                alignItems="center"
                // justifyContent="center"
                height="100%"
                width="100%"
              >
                <BookIcon size={["110px", "130px"]} paddingBottom="12px" />
                <Heading
                  as="h2"
                  textAlign="center"
                  fontSize={["lg", "lg", "lg", "xl"]}
                >
                  {title}
                </Heading>
              </Flex>
            </Link>
          </Box>

          <EditBook title={title} id={id} />
        </PseudoBox>
      </Flex>
    </Box>
  );
};

export default Book;
