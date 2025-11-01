import React from "react";
import LiquidRenderer from "../LiquidRenderer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const TipBlockRenderer = ({ block }) => {

  return (
    <div className={`${block.className}`}>
      <div className="group relative">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className={block.tip_btn.className}
              style={block.tip_btn.style}
            >
              <LiquidRenderer
                className={""}
                html={block.tip_btn.template}
                data={{
                  amount: 20000,
                  currency: "INR",
                }}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className={block.tip_card.className}
            style={block.tip_card.style}
          >
            <LiquidRenderer
              className={""}
              html={block.tip_card.template}
              data={{
                amount: 20000,
                currency: "INR",
                visitor_name: "John Doe",
                display_name: "John Doe",
                message: "Thank you for your tip!",
                created_at: Date.now(),
                data: block.tip_card.data,
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default TipBlockRenderer;
