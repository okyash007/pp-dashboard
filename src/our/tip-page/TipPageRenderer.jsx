import React from "react";
import TipBlockRenderer from "./TipBlockRenderer";
import RazorpayBtnRenderer from "./RazorpayBtnRenderer";
import UserFormRenderer from "./UserFormRenderer";
import NormalBlockRenderer from "./NormalBlockRenderer";

const TipPageRenderer = ({ blocks }) => {

  return (
    <div className="max-w-2xl mx-auto">
      {blocks.map((block) => {
        if (block.type === "tips") {
          return <TipBlockRenderer key={block.type} block={block} />;
        }
        if (block.type === "razorpay") {
          return <RazorpayBtnRenderer key={block.type} block={block} />;
        }
        if (block.type === "user_form") {
          return <UserFormRenderer key={block.type} block={block} />;
        }
        return <NormalBlockRenderer key={block.type} block={block} />;
      })}
    </div>
  );
};

export default TipPageRenderer;
