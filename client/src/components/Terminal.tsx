import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";

const terminal = new Terminal({
    cursorBlink: true,
  });

const TerminalComponent = () => {
  const termRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!termRef.current) return;

    // Open terminal in the div
    terminal.open(termRef.current);
    terminal.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');

    // Handle user input
    terminal.onKey((data) => {
        terminal.write(data.key);
    });

    // Cleanup
    return () => {
      terminal.dispose();
    };
  }, [termRef]);

  return <div ref={termRef} />;
};

export default TerminalComponent;