import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vsDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const CodeBlock = ({ block }) => {
  const { type } = block;
  const { language, rich_text } = block[type];
  const code = rich_text[0].plain_text;

  if (!code) {
    return null;
  }

  return (
    <SyntaxHighlighter language={language} style={vsDark}>
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
