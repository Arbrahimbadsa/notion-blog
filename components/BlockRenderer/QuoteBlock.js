import React from "react";

const QuoteBlock = ({ block }) => {
  const { type } = block;

  const text = block[type].rich_text;

  const renderText = (text) => {
    return text.map((textChunk, index) => {
      const { annotations, plain_text } = textChunk;
      const { bold, italic, strikethrough, underline, code, color } =
        annotations;

      let element = <span>{plain_text}</span>;

      if (bold) {
        element = <strong>{element}</strong>;
      }

      if (italic) {
        element = <em>{element}</em>;
      }

      if (strikethrough) {
        element = <del>{element}</del>;
      }

      if (underline) {
        element = <u>{element}</u>;
      }

      if (code) {
        element = <code>{element}</code>;
      }

      if (color) {
        element = <span style={{ color }}>{element}</span>;
      }

      return <React.Fragment key={index}>{element}</React.Fragment>;
    });
  };

  return (
    <blockquote style={{ borderLeft: "5px solid #808080", paddingLeft: "8px" }}>
      {renderText(text)}
    </blockquote>
  );
};

export default QuoteBlock;
