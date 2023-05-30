import React from "react";
import ParagraphBlock from "./ParagraphBlock";
import BookmarkBlock from "./BookmarkBlock";
import EmbedBlock from "./EmbedBlock";
import VideoBlock from "./VideoBlock";
import HeadingBlock from "./HeadingBlock";

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
    // Add more mappings for other block types as needed
  };

  // Get the corresponding component for the block type
  const Component = componentMapping[blockType];

  if (Component) {
    return <Component block={block} />;
  } else {
    return <div>Unsupported block type: {blockType}</div>;
  }
};

export default BlockRenderer;
