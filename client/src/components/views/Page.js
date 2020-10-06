import React from "react";
import ReactPlayer from "react-player";
import { Flex, Grid, IconButton, Text } from "@chakra-ui/core";

const Page = ({ number, video, pageCount, visible, setVisible }) => (
  <Grid
    className="page-grid-container"
    height="95%"
    width="95%"
    gridTemplateRows="1fr 1fr"
    padding={2}
    boxShadow="0 0 10px gray"
  >
    <Flex>
      <ReactPlayer url={video.link} />
    </Flex>
    <Flex>
      <Text>{video.notes}</Text>
      <IconButton
        aria-label="Previous page"
        icon="arrow-left"
        isRound
        variant="outline"
        isDisabled={number === 1}
        onClick={() => setVisible(number - 1)}
      />
      <IconButton
        aria-label="Next page"
        icon="arrow-right"
        isRound
        variant="outline"
        isDisabled={number === pageCount}
        onClick={() => setVisible(number + 1)}
      />
    </Flex>
  </Grid>
);

export default Page;
