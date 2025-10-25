import React from "react";
import { Input } from "@/components/ui/input";

const UserFormRenderer = ({ block }) => {
  return (
    <div className={block.className}>
      <div>
        <Input
          className={block.input.className}
          style={block.input.style}
          id="name"
          type="text"
          placeholder="Enter your name"
        />
      </div>
      <div>
        <Input
          className={block.input.className}
          style={block.input.style}
          id="email"
          type="email"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <Input
          className={block.input.className}
          style={block.input.style}
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
        />
      </div>
      <div>
        <Input
          className={block.input.className}
          style={block.input.style}
          id="amount"
          type="number"
          placeholder="Enter the amount"
        />
      </div>
      <div>
        <Input
          className={block.input.className}
          style={block.input.style}
          id="message"
          type="text"
          placeholder="Enter your message"
        />
      </div>
    </div>
  );
};

export default UserFormRenderer;
