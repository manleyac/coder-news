import React from "react";
import { Box, Heading, Image } from "grommet";
const NotFound = () => {
  return (
    <Box
      id="content"
      background="accent-5"
      style={{
        height: "100%",
        minHeight: "calc(100vh - 84px - 96px)",
        paddingBottom: "5vh",
        zIndex: 1,
      }}
    >
      <Heading alignSelf="center" textAlign="center">Page Not Found</Heading>
      <Image
        src="https://i.kym-cdn.com/entries/icons/original/000/023/967/obiwan.jpg"
        fit="contain"
        style={{
          maxWidth: "100%",
          height: "auto",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
    </Box>
  );
};

export default NotFound;
