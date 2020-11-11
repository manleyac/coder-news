import React from "react";
import { Markdown, Heading, Paragraph, Image } from "grommet";

const markdownComponents = {
  h1: {
    component: Heading,
    props: { level: 1, alignSelf: "center", textAlign: "center", style: { maxWidth: "100%" } },
  },
  h2: {
    component: Heading,
    props: { level: 2, alignSelf: "center", textAlign: "center", style: { maxWidth: "100%" } },
  },
  h3: {
    component: Heading,
    props: { level: 3, alignSelf: "center", textAlign: "center", style: { maxWidth: "100%" } },
  },
  img: {
    component: Image,
    props: {
      alignSelf: "center",
      fit: "contain",
      style: {
        maxWidth: "100%",
        height: "auto",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
  },
  p: {
    component: Paragraph,
    props: { alignSelf: "center", style: { maxWidth: "100%" } },
  },
};

const markdownOptions = {
  forceBlock: true,
};

const CustomMD = (props) => (
  <Markdown components={markdownComponents} options={markdownOptions}>
    {props.children}
  </Markdown>
);

export default CustomMD;
