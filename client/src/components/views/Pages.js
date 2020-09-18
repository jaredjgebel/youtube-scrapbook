import React, { useContext, useState } from "react";
import { Flex, IconButton } from "@chakra-ui/core";

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
    <>
      {book.pages.map((page, i) => {
        return (
          <Flex key={i}>
            {visible === page.number ? (
              <>
                <IconButton
                  aria-label="Previous page"
                  icon="arrow-left"
                  isRound
                  variant="outline"
                  isDisabled={page.number === 1}
                  onClick={() => setVisible(page.number - 1)}
                />
                <Page number={page.number} videos={page.videos} />
                <IconButton
                  aria-label="Next page"
                  icon="arrow-right"
                  isRound
                  variant="outline"
                  isDisabled={page.number === book.pages.length}
                  onClick={() => setVisible(page.number + 1)}
                />
              </>
            ) : (
              <div style={{ display: "none" }}>
                <Page number={page.number} videos={page.videos} />
              </div>
            )}
          </Flex>
        );
      })}
    </>
  );
};

export default Pages;
