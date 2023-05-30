import React from "react";

const TodoBlock = ({ block }) => {
  const { type } = block;
  const todo = block[type];
  const rich_text = todo.rich_text;
  const checked = todo.checked;

  if (!rich_text) {
    return null;
  }

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
    <div>
      <input type="checkbox" checked={checked} readOnly />
      <label>
        {checked ? <del>{renderText(rich_text)}</del> : renderText(rich_text)}
      </label>
    </div>
  );
};

export default TodoBlock;
