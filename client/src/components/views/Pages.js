import React, { Fragment, useContext, useState } from "react";

import Page from "./Page";
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
          <Fragment key={i}>
            {visible === page.number && (
              <Page
                number={page.number}
                video={page.videos[0]}
                pageCount={book.pages.length}
                visible={visible}
                setVisible={setVisible}
              />
            )}
          </Fragment>
        );
      })}
    </>
  );
};

export default Pages;
