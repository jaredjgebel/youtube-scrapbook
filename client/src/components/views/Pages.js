import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Flex } from "@chakra-ui/core";

import Page from "./Page";
import AddButton from "../buttons/AddButton";
import UserContext from "../contexts/UserContext";
import IconWithStyle from "../buttons/IconWithStyle";
import Loading from "./Loading";

const Pages = (props) => {
  const user = useContext(UserContext);
  const [visible, setVisible] = useState(1);

  const book =
    user &&
    user.books &&
    user.books.find((book) => book._id === props.match.params.id);

  if (!book) {
    return <Loading />;
  }

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
          maxHeight="95%"
          width="95%"
          alignItems="flex-end"
          justifyContent="flex-start"
          paddingX={[2, 4, 6, 8]}
          paddingY={2}
          boxShadow="0 0 10px gray"
          overflowY="auto"
        >
          <IconWithStyle
            aria-label="Previous page"
            icon="arrow-left"
            isRound
            isDisabled={blankPageIndex === 1}
            onClick={() => setVisible(blankPageIndex - 1)}
          />
          <AddButton
            alignSelf="center"
            marginLeft={`calc(50% - 60px)`}
            ariaLabel="Add new page"
          />
        </Flex>
      )}
    </Fragment>
  );

  return (
    <>
      <Link to="/books">
        <IconWithStyle
          icon="arrow-back"
          isRound
          aria-label="Back to Books"
          variant="solid"
          style={{ position: "absolute", top: "5px", left: "5px" }}
        />
      </Link>

      {pages}
    </>
  );
};

export default Pages;
