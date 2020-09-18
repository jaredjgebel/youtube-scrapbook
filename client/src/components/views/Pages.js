import React, { useContext, useState } from "react";
import { Box, Flex, IconButton } from "@chakra-ui/core";

import Page from "../views/Page";
import UserContext from "../contexts/UserContext";

const Pages = (props) => {
  const user = useContext(UserContext);

  const book =
    user &&
    user.books &&
    user.books.find((book) => book.id === props.match.params.id);

  const [visible, setVisible] = useState(book.pages[0].number);

  return (
    <Flex
      className="flex-container"
      direction="column"
      justifyContent="stretch"
      width="100%"
    >
      {book.pages.map((page, i) => {
        return (
          <Box key={i} height="100%" width="100%">
            {visible === page.number && (
              <Flex
                className="page-container"
                alignItems="flex-end"
                justifyContent="space-between"
                width="100%"
                minHeight="90vh"
              >
                <IconButton
                  aria-label="Previous page"
                  icon="arrow-left"
                  isRound
                  variant="outline"
                  isDisabled={page.number === 1}
                  onClick={() => setVisible(page.number - 1)}
                />
                <Page number={page.number} videos={page.videos} height="100%" />
                <IconButton
                  aria-label="Next page"
                  icon="arrow-right"
                  isRound
                  variant="outline"
                  isDisabled={page.number === book.pages.length}
                  onClick={() => setVisible(page.number + 1)}
                />
              </Flex>
            )}
          </Box>
        );
      })}
    </Flex>
  );
};

export default Pages;
