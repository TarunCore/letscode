import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from '@xterm/addon-fit';
import "@xterm/xterm/css/xterm.css";
const fitAddon = new FitAddon();

const OPTIONS_TERM = {
  useStyle: true,
  screenKeys: true,
  cursorBlink: true,
  cols: 200,
  theme: {
      background: "black"
  }
};

const TerminalComponent = () => {
  const termRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!termRef || !termRef.current) return;

    // Open terminal in the div
    const terminal = new Terminal(OPTIONS_TERM)
    terminal.open(termRef.current);
    terminal.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
    terminal.loadAddon(fitAddon);
    fitAddon.fit();
    // console.log(termRef.current)
    // // Handle user input
    terminal.onData((data) => {
      console.log(data);
        terminal.write(data);
    });

    // // Cleanup
    return () => {
      terminal.dispose();
    };
  }, [termRef]);

  return <div ref={termRef} />;
};

export default TerminalComponent;