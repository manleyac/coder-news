import React from "react";
import { Box } from "grommet";

const MaxWidth = (props) => {
  return (
    <Box
      width={{ max: "900px" }}
      fill="horizontal"
      margin={{ left: "1vw", right: "1vw" }}
      alignSelf="center"
    >
      {props.children}
    </Box>
  );
};

export default MaxWidth;