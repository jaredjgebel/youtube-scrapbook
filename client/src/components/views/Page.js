import React from "react";
import ReactPlayer from "react-player";
import { useRouteMatch } from "react-router-dom";
import { Flex, Grid, Text, useDisclosure } from "@chakra-ui/core";

import IconWithStyle from "../buttons/IconWithStyle";
import AddVideoModal from "../forms/AddVideoModal";
import EditVideoModal from "../forms/EditVideoModal";
import DeletePageModal from "../forms/DeletePageModal";

const AddVideo = ({ pageId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { params } = useRouteMatch();
  const { id } = params;
  return (
    <>
      <IconWithStyle
        aria-label="Add video"
        icon="add"
        isRound
        marginRight={1}
        onClick={onOpen}
      />
      <AddVideoModal
        isOpen={isOpen}
        onClose={onClose}
        bookId={id}
        pageId={pageId}
      />
    </>
  );
};

const EditVideo = ({ pageId, videoId, link, notes }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { params } = useRouteMatch();
  const { id } = params;

  return (
    <>
      <IconWithStyle
        icon="edit"
        aria-label="Edit video"
        isRound
        onClick={onOpen}
      />
      <EditVideoModal
        isOpen={isOpen}
        onClose={onClose}
        bookId={id}
        pageId={pageId}
        videoId={videoId}
        link={link}
        notes={notes}
      />
    </>
  );
};

const DeletePage = ({ pageId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { params } = useRouteMatch();
  const { id } = params;

  return (
    <>
      <IconWithStyle
        aria-label="Delete page"
        icon="delete"
        isRound
        marginLeft={1}
        onClick={onOpen}
      />
      <DeletePageModal
        bookId={id}
        pageId={pageId}
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
};

const Page = ({ id, number, video, setVisible }) => (
  <Grid
    className="page-grid-container"
    height="95%"
    maxHeight="95%"
    width="95%"
    gridTemplateRows={["50% 50%", "65% 35%", null, "75% 25%"]}
    paddingX={[0, 4, 6, 8]}
    paddingY={1}
    boxShadow="0 0 10px gray"
    overflowY="unset"
  >
    <>
      {video && (
        <Flex
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
          paddingY={2}
        >
          <ReactPlayer url={video.link} width="100%" height="100%" />
        </Flex>
      )}

      <Grid gridTemplateRows="3fr 1fr" height="100%">
        {video && (
          <Flex
            flexDirection="column"
            justifyContent="space-between"
            width="100%"
            height="100%"
            overflowY="auto"
          >
            <Text padding={4}>{video.notes}</Text>
          </Flex>
        )}

        <Flex
          alignItems="flex-end"
          justifyContent="space-between"
          width="100%"
          paddingBottom={1}
        >
          <IconWithStyle
            aria-label="Previous page"
            icon="arrow-left"
            isRound
            isDisabled={number === 1}
            marginLeft={1}
            onClick={() => setVisible(number - 1)}
          />

          <Flex>
            {video ? (
              <EditVideo
                pageId={id}
                videoId={video._id}
                link={video.link}
                notes={video.notes}
              />
            ) : (
              <AddVideo pageId={id} />
            )}

            {video ? (
              <IconWithStyle
                aria-label="Delete video"
                icon="delete"
                isRound
                marginLeft={1}
              />
            ) : (
              <DeletePage pageId={id} />
            )}
          </Flex>

          <IconWithStyle
            aria-label="Next page"
            icon="arrow-right"
            isRound
            marginRight={1}
            onClick={() => setVisible(number + 1)}
          />
        </Flex>
      </Grid>
    </>
  </Grid>
);

export default Page;
