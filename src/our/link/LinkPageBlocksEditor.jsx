import React from "react";
import SocialsEditor from "./SocialsEditor";

const LinkPageBlocksEditor = ({ blocks, setBlocks }) => {

  return (
    <>
      {blocks.map((block) =>
        block.type === "socials" ? (
          <SocialsEditor
            key={block.type}
            block={block}
            setBlock={(newBlock) =>
              setBlocks((prev) =>
                prev.map((b) => (b.type === block.type ? newBlock : b))
              )
            }
          />
        ) : null
      )}
    </>
  );
};

export default LinkPageBlocksEditor;
