export const addIndexToNumberedListItems = (blocks) => {
  let listCounter = 1;
  let currentListCounter = 1;
  let isPreviousBlockNumbered = false;

  return blocks.map((block) => {
    if (block.type === "numbered_list_item") {
      if (!isPreviousBlockNumbered) {
        currentListCounter = 1;
      }

      const updatedBlock = {
        ...block,
        index: currentListCounter++,
      };

      isPreviousBlockNumbered = true;
      return updatedBlock;
    }

    isPreviousBlockNumbered = false;
    return block;
  });
};
