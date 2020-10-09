import React from "react";
import ReactPlayer from "react-player";
import { Flex, Grid, IconButton, Text } from "@chakra-ui/core";
import ButtonWithStyle from "../buttons/ButtonWithStyle";

const Page = ({ number, video, setVisible }) => (
  <Grid
    className="page-grid-container"
    height="95%"
    maxHeight="95%"
    width="95%"
    gridTemplateRows="50% 50%"
    paddingX={[0, 4, 6, 8]}
    paddingY={1}
    boxShadow="0 0 10px gray"
    overflowY="unset"
  >
    <Flex
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      paddingY={2}
    >
      <ReactPlayer url={video.link} width="100%" height="100%" />
    </Flex>

    <Grid gridTemplateRows="3fr 1fr" height="100%">
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        width="100%"
        height="100%"
        overflowY="auto"
      >
        <Text padding={4}>{video.notes}</Text>
      </Flex>

      <Flex
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        paddingBottom={2}
      >
        <IconButton
          aria-label="Previous page"
          icon="arrow-left"
          isRound
          variant="outline"
          isDisabled={number === 1}
          onClick={() => setVisible(number - 1)}
        />

        <ButtonWithStyle width={["100px", "100px", "100px", "125px"]}>
          Edit
        </ButtonWithStyle>

        <ButtonWithStyle width={["100px", "100px", "100px", "125px"]}>
          Delete
        </ButtonWithStyle>

        <IconButton
          aria-label="Next page"
          icon="arrow-right"
          isRound
          variant="outline"
          onClick={() => setVisible(number + 1)}
        />
      </Flex>
    </Grid>
  </Grid>
);

export default Page;
