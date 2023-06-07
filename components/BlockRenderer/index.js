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
import OrderedListItemBlock from "./OrderedListItemBlock";
import TableBlock from "./TableBlock";

// const addListingNumber = (blocks) => {
//   for (let i = 0; i < blocks.length; i++) {
//     const current = blocks[i];
//     const next = blocks[i < blocks.length ? i + 1 : i];
//     let index = 0;
//     if (current.type === "numbered_list_item") {
//       index++;
//       if (next.type === "numbered_list_item") {
//         blocks[i] = {
//           ...current,
//           index,
//         };
//       } else {
//         index = 0;
//         blocks[i] = {
//           ...current,
//           index: 1,
//         };
//       }
//     }
//   }
//   return blocks;
// };

const BlockRenderer = ({ block, blocks }) => {
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
    numbered_list_item: OrderedListItemBlock,
    image: ImageBlock,
    code: CodeBlock,
    quote: QuoteBlock,
    to_do: TodoBlock,
    bookmark: BookmarkBlock,
    table: TableBlock
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
    return "Unsupported block type " + blockType;
  }
};

export default BlockRenderer;
