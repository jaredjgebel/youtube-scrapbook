import React from "react";
import ReactPlayer from "react-player";
import { Flex, Grid, Text } from "@chakra-ui/core";

const Page = ({ number, videos }) => (
  <Grid boxShadow="0 0 10px gray" width="100%" marginX={4}>
    <Text>{number}</Text>
    {videos.map((video) => (
      <>
        <Flex>
          <ReactPlayer url={video.link} />
        </Flex>
        <Flex>{video.notes}</Flex>
      </>
    ))}
  </Grid>
);

export default Page;
