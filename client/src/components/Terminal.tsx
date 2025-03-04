import React, { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import io from 'socket.io-client';
import '@xterm/xterm/css/xterm.css';

const TerminalComponent: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<any>(null);
  const terminalInstanceRef = useRef<Terminal | null>(null);

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
      socket.emit('terminal_input', data);
    });

    // Cleanup
    return () => {
      terminal.dispose();
      socket.disconnect();
    };
  }, []);

  return <div ref={terminalRef} style={{ height: '100%', width: '100%' }} />;
};

export default TerminalComponent;