import React from "react";
import ReactPlayer from "react-player";
import { Flex, Grid, IconButton, Text } from "@chakra-ui/core";
import ButtonWithStyle from "../buttons/ButtonWithStyle";

const Page = ({ number, video, pageCount, setVisible }) => (
  <Grid
    className="page-grid-container"
    height="95%"
    width="95%"
    gridTemplateRows="1.2fr 1fr"
    paddingX={[2, 4, 6, 8]}
    paddingY={2}
    boxShadow="0 0 10px gray"
    overflowY="auto"
  >
    <Flex width="90vw" justifyContent="center" alignItems="center">
      <ReactPlayer url={video.link} />
    </Flex>
    <Flex flexDirection="column" justifyContent="space-between">
      <Flex flexDirection="column">
        <Text padding={4}>{video.notes}</Text>
        <Flex justifyContent="space-around">
          <ButtonWithStyle
            margin={2}
            width={["100px", "100px", "100px", "125px"]}
          >
            Edit
          </ButtonWithStyle>
          <ButtonWithStyle
            margin={2}
            width={["100px", "100px", "100px", "125px"]}
          >
            Delete
          </ButtonWithStyle>
        </Flex>
      </Flex>
      <Flex justifyContent="space-between" width="100%">
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
    </Flex>
  </Grid>
);

export default Page;
