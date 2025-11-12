import React from "react";
import TipsEditor from "./TipsEditor";
import RazorparBtnEditor from "./RazorparBtnEditor";
import UserFormEditor from "./UserFormEditor";

const TipPageBlocksEditor = ({ blocks, setBlocks }) => {
  return (
    <div className="space-y-3">
      {blocks.map((block) => {
        if (block.type === "tips") {
          return (
            <TipsEditor
              key={block.type}
              block={block}
              setBlock={(newBlock) =>
                setBlocks((prev) =>
                  prev.map((b) => (b.type === block.type ? newBlock : b))
                )
              }
            />
          );
        }

        if (block.type === "razorpay") {
          return (
            <RazorparBtnEditor
              key={block.type}
              block={block}
              setBlock={(newBlock) =>
                setBlocks((prev) =>
                  prev.map((b) => (b.type === block.type ? newBlock : b))
                )
              }
            />
          );
        }

        // if (block.type === "user_form") {
        //   return (
        //     <UserFormEditor
        //       key={block.type}
        //       block={block}
        //       setBlock={(newBlock) =>
        //         setBlocks((prev) =>
        //           prev.map((b) => (b.type === block.type ? newBlock : b))
        //         )
        //       }
        //     />
        //   );
        // }

        return <div key={block.type}></div>;
      })}
    </div>
  );
};

export default TipPageBlocksEditor;
