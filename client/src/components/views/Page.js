import React from "react";
import ReactPlayer from "react-player";
import { Flex, Grid, Text } from "@chakra-ui/core";
import IconWithStyle from "../buttons/IconWithStyle";

const Page = ({ number, video, setVisible }) => (
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
          <IconWithStyle
            aria-label="Edit page"
            icon="edit"
            isRound
            marginRight={1}
          />
          <IconWithStyle
            aria-label="Delete page"
            icon="delete"
            isRound
            marginLeft={1}
          />
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
  </Grid>
);

export default Page;
