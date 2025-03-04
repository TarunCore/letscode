import React, { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import io from 'socket.io-client';
import '@xterm/xterm/css/xterm.css';
let s = "";
const TerminalComponent: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<any>(null);
  const terminalInstanceRef = useRef<Terminal | null>(null);
  const [command, setCommand] = React.useState('');
  useEffect(() => {
    // Create terminal
    const terminal = new Terminal({
      convertEol: true,
      cursorBlink: true,
    });
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);

    // Connect to socket
    const socket = io('http://localhost:3000');
    socketRef.current = socket;
    terminalInstanceRef.current = terminal;

    // Render terminal
    if (terminalRef.current) {
      terminal.open(terminalRef.current);
      fitAddon.fit();
    }

    // Handle incoming terminal output
    socket.on('terminal_output', (data: string) => {
      terminal.write(data);
    });

    // Handle user input
    terminal.onData((data: any) => {
      // TODO: handle ctrc+c
      if (data === '\r') {
        console.log("sending command: ", s);
        socket.emit('terminal_input', s+"\n");
        setCommand('');
        s="";
      }else if (data === '\x7F') {  // Backspace
        if (s.length > 0) {
          s = s.slice(0, -1);
          terminal.write('\b \b');
        }
      }
      else{
        console.log("data: ", data, "command: ", command, "s", s);
        s = s + data;
        setCommand(prev => prev + data);
        terminal.write(data);
      }
      
    });

    // Cleanup
    return () => {
      terminal.dispose();
      socket.disconnect();
    };
  }, []);

  return <div ref={terminalRef} style={{ height: '90vh', width: '100%' }} />;
};

export default TerminalComponent;