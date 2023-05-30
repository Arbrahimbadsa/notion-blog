import React from "react";
import ParagraphBlock from "./ParagraphBlock";
import BookmarkBlock from "./BookmarkBlock";
import EmbedBlock from "./EmbedBlock";
import VideoBlock from "./VideoBlock";
import HeadingBlock from "./HeadingBlock";
import BulletedListBlock from "./BulletedListBlock";
import ImageBlock from "./ImageBlock";
import CodeBlock from "./CodeBlock";
import QuoteBlock from "./QuoteBlock";
import TodoBlock from "./TodoBlock";

const BlockRenderer = ({ block }) => {
  const blockType = block.type;

  // Define the component mapping for each block type
  const componentMapping = {
    paragraph: ParagraphBlock,
    embed: EmbedBlock,
    video: VideoBlock,
    heading_1: HeadingBlock,
    heading_2: HeadingBlock,
    heading_3: HeadingBlock,
    bulleted_list_item: BulletedListBlock,
    image: ImageBlock,
    code: CodeBlock,
    quote: QuoteBlock,
    to_do: TodoBlock,
    bookmark: BookmarkBlock,
    // Add more mappings for other block types as needed
  };

  // Get the corresponding component for the block type
  const Component = componentMapping[blockType];

  if (Component) {
    return (
      <div style={{ margin: "16px 0" }}>
        <Component block={block} />
      </div>
    );
  } else {
    return null;
  }
};

export default BlockRenderer;
