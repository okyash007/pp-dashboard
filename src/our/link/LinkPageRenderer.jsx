import React from "react";
import { useAuthStore } from "../../stores/authStore";
import LiquidRenderer from "../LiquidRenderer";

const LinkPageRenderer = ({ blocks }) => {
  const { user } = useAuthStore();
  return (
    <div className="max-w-2xl mx-auto">
      {blocks.map((block) => (
        <LiquidRenderer
          key={block.type}
          className={block.className}
          style={block.style}
          html={block.template}
          data={{ ...user, data: block.data }}
        />
      ))}
    </div>
  );
};

export default LinkPageRenderer;
