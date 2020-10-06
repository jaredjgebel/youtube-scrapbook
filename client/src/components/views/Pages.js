import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Flex, IconButton } from "@chakra-ui/core";

import Page from "./Page";
import AddButton from "../buttons/AddButton";
import UserContext from "../contexts/UserContext";

const Pages = (props) => {
  const user = useContext(UserContext);

  const book =
    user &&
    user.books &&
    user.books.find((book) => book.id === props.match.params.id);

  const [visible, setVisible] = useState(book.pages[0].number);

  const pages = book.pages.map((page, i) => {
    return (
      <Fragment key={i}>
        {visible === page.number && (
          <Page
            number={page.number}
            video={page.videos[0]}
            pageCount={book.pages.length}
            setVisible={setVisible}
          />
        )}
      </Fragment>
    );
  });

  const blankPageIndex = book.pages.length + 1;

  pages.push(
    <Fragment key={blankPageIndex}>
      {visible === blankPageIndex && (
        <Flex
          height="95%"
          width="95%"
          alignItems="flex-end"
          justifyContent="flex-start"
          paddingX={[2, 4, 6, 8]}
          paddingY={2}
          boxShadow="0 0 10px gray"
          overflowY="auto"
        >
          <IconButton
            aria-label="Previous page"
            icon="arrow-left"
            isRound
            variant="outline"
            onClick={() => setVisible(blankPageIndex - 1)}
          />
          <AddButton alignSelf="center" marginLeft={`calc(50% - 60px)`} />
        </Flex>
      )}
    </Fragment>
  );

  return (
    <>
      <Link to="/books">
        <IconButton
          icon="arrow-back"
          isRound
          aria-label="Back to Books"
          style={{ position: "absolute", top: "5px", left: "5px" }}
        />
      </Link>

      {pages}
    </>
  );
};

export default Pages;
