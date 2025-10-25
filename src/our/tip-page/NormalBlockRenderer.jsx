import React from "react";
import { useAuthStore } from "../../stores/authStore";
import LiquidRenderer from "../LiquidRenderer";

const NormalBlockRenderer = ({ block }) => {
  const { user } = useAuthStore();
  return (
    <LiquidRenderer
      html={block.template}
      data={{ ...user }}
      style={block.style}
      className={block.className}
    />
  );
};

export default NormalBlockRenderer;
