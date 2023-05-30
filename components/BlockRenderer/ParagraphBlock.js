const ParagraphBlock = ({ block }) => {
  const text = block.paragraph.rich_text;

  // Helper function to handle annotations within the text
  const renderTextWithAnnotations = (text) => {
    return text.map((textNode, index) => {
      if (textNode.annotations.bold) {
        return <strong key={index}>{textNode.plain_text}</strong>;
      } else if (textNode.annotations.italic) {
        return <em key={index}>{textNode.plain_text}</em>;
      } else if (textNode.annotations.underline) {
        return <u key={index}>{textNode.plain_text}</u>;
      } else if (textNode.annotations.strikethrough) {
        return <del key={index}>{textNode.plain_text}</del>;
      } else if (textNode.annotations.code) {
        return (
          <code
            style={{
              background: "black",
              color: "#fff",
              padding: "3px 5px",
              borderRadius: "5px",
            }}
            key={index}
          >
            {textNode.plain_text}
          </code>
        );
      } else if (textNode.text.link) {
        return (
          <a
            key={index}
            href={textNode.href}
            style={{ color: "blue" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {textNode.plain_text}
          </a>
        );
      } else {
        return <span key={index}>{textNode.plain_text}</span>;
      }
    });
  };

  return <p>{renderTextWithAnnotations(text)}</p>;
};

export default ParagraphBlock;
