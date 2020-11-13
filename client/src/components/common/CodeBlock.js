import React, { useEffect } from "react";
import Prism from "prismjs";

const CodeBlock = (props) => {
  const { language } = props;
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <pre>
      <code className={`language-${language}`}>{props.children}</code>
    </pre>
  );
};

export default CodeBlock;
