import React from "react";
import { Liquid } from "liquidjs";
import MonitorDisplay from "./MonitorDisplay";
import { useAuthStore } from "../../stores/authStore";

const BlockRenderer = ({ blocks }) => {
  const { user } = useAuthStore();
  const renderBlock = (block) => {
    if (block.type === "leaderboard") {
      try {
        const engine = new Liquid();
        const blockData = {
          rankers: [
            {
              rank: 1,
              name: "John Doe",
              amount: 100000,
              currency: "INR",
            },
            {
              rank: 2,
              name: "Jane Doe",
              amount: 90000,
              currency: "INR",
            },
            {
              rank: 3,
              name: "Jim Doe",
              amount: 80000,
              currency: "INR",
            },
            {
              rank: 4,
              name: "Jill Doe",
              amount: 70000,
              currency: "INR",
            },
            {
              rank: 5,
              name: "Jill Doe",
              amount: 70000,
              currency: "INR",
            },
          ],
        };

        const renderedContent = engine.parseAndRenderSync(
          block.template,
          blockData
        );
        const blockStyles = block.style || {};
        const styleString = Object.entries(blockStyles)
          .map(([key, value]) => `${key}: ${value}`)
          .join("; ");

        console.log(renderedContent);

        return `<div class="${block.className}" style="${styleString}">${renderedContent}</div>`;
      } catch (err) {
        console.error("Error rendering block:", err);
        return `<div class="${block.className}" style="color: red; padding: 10px;">Error rendering block: ${err.message}</div>`;
      }
    }

    try {
      const engine = new Liquid();
      const blockData = {
        data: block.data || {},
        style: block.style || {},
        visitor_name: "Anonymous",
        amount: 50000,
        currency: "INR",
        message: "Hii there",
        username: user?.username,
      };

      const renderedContent = engine.parseAndRenderSync(
        block.template,
        blockData
      );
      const blockStyles = block.style || {};
      const styleString = Object.entries(blockStyles)
        .map(([key, value]) => `${key}: ${value}`)
        .join("; ");

      return `<div class="${block.className}" style="${styleString}">${renderedContent}</div>`;
    } catch (err) {
      console.error("Error rendering block:", err);
      return `<div class="${block.className}" style="color: red; padding: 10px;">Error rendering block: ${err.message}</div>`;
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

    const blocksHTML = blocks
      .map((block) =>
        renderBlock(block).replace("<div", `<div data-key="${block.type}"`)
      )
      .join("\n");

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
