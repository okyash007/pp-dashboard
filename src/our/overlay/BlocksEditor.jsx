import React from "react";
import TipOverlayEditor from "./TipOverlayEditor";

const BlocksEditor = ({ blocks, setBlocks }) => {
  const setPresetPosition = (blockId, position) => {
    const presets = {
      "top-left": { top: 20, left: 20 },
      "top-right": { top: 20, left: 500 },
      "bottom-left": { top: 400, left: 20 },
      "bottom-right": { top: 400, left: 500 },
    };

    setBlocks((prev) =>
      prev.map((b) =>
        b.id === blockId
          ? {
              ...b,
              style: {
                ...b.style,
                ...presets[position],
              },
            }
          : b
      )
    );
  };

  return (
    <>
      {blocks.map((block) => {
        if (block.type === "tip") {
          return <TipOverlayEditor key={block.id} block={block} setBlocks={setBlocks} />;
        }
      })}
    </>
  );
};

export default BlocksEditor;
