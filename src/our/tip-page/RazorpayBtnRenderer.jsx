import React from "react";
import { Button } from "@/components/ui/button";

const RazorpayBtnRenderer = ({ block }) => {

  return (
    <div className={block.className}>
      <Button className={block.button.className} style={block.button.style}>
        {block.button.text}
      </Button>
    </div>
  );
};

export default RazorpayBtnRenderer;
