import React from "react";

//components
import MaxWidth from "./common/MaxWidth";
import { Box, Header } from "grommet";
import { Github } from "grommet-icons";

const Footer = () => (
  <Box height="xsmall" align="baseline" background="brand" pad="medium">
    <MaxWidth>
      <Box direction="row" margin="small" justify="between">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.manleyweb.dev"
          className="navLink"
        >
          <Header level={4}>site by manleyweb.dev</Header>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="#"
          className="navLink"
        >
          <Github color="accent-1" size="30px" />
        </a>
      </Box>
    </MaxWidth>
  </Box>
);

export default Footer;
