import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";

const TerminalComponent = () => {
  const termRef = useRef<Terminal | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const term = new Terminal();
    term.open(document.getElementById("terminal")!);
    termRef.current = term;
    term.write("Welcome to CodePractice\n");
  }, []);

  return <div id="terminal" style={{ height: "500px", width: "800px" }} />;
};

export default TerminalComponent;
