import React from "react";

const HeadingBlock = ({ block }) => {
  const { type } = block;

  const text = block[type].rich_text;

  const getHeadingTag = (type) => {
    switch (type) {
      case "heading_1":
        return "48px";
      case "heading_2":
        return "40px";
      case "heading_3":
        return "39px";
      case "heading_4":
        return "36px";
      case "heading_5":
        return "35px";
      case "heading_6":
        return "20px";
      default:
        return "48px"; // Default to heading level 1
    }
  };

  const size = getHeadingTag(type);

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
    <h1
      className={`text-[${size}] font-semibold tracking-[-.04em] leading-[1.25]`}
    >
      {renderText(text)}
    </h1>
  );
};

export default HeadingBlock;
