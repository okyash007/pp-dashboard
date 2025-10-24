import React from "react";
import { Liquid } from "liquidjs";
import MonitorDisplay from "./MonitorDisplay";

const BlockRenderer = ({ blocks }) => {

  const renderBlock = (block) => {
    if (!block.template) {
      return null;
    }

    try {
      const engine = new Liquid();
      const blockData = {
        data: block.data || {},
        style: block.style || {},
        // Add default values for common variables
        visitor_name: "Anonymous",
        amount: 50000,
        currency: "INR",
        message: "Hii there",
      };

      const renderedContent = engine.parseAndRenderSync(block.template, blockData);
      const blockStyles = block.style || {};
      const styleString = Object.entries(blockStyles)
        .map(([key, value]) => `${key}: ${value}`)
        .join('; ');
      
      return `<div style="${styleString}">${renderedContent}</div>`;
    } catch (err) {
      console.error("Error rendering block:", err);
      return `<div style="color: red; padding: 10px;">Error rendering block: ${err.message}</div>`;
    }
  };

  const generateHTML = () => {
    if (!blocks || blocks.length === 0) {
      return `
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Tip Overlay</title>
            <style>
              body {
                margin: 0;
                padding: 0;
                background: transparent;
                overflow: hidden;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              }
            </style>
            <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
          </head>
          <body>
            <div style="
              width: 100vw;
              height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
              background: transparent;
              color: #666;
            ">
              No blocks to display
            </div>
          </body>
        </html>
      `;
    }

    const blocksHTML = blocks.map((block) => renderBlock(block)).join("\n");

    return `
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Tip Overlay</title>
          <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        </head>
        <body>
          ${blocksHTML}
        </body>
      </html>
    `;
  };

  return (
    <MonitorDisplay
      width={1920}
      height={1080}
      html={generateHTML()}
      monitorName="Overlay"
    />
  );
};

export default BlockRenderer;
