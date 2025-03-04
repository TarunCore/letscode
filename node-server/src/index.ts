import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import Docker from 'dockerode';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" },
});

const docker = new Docker({ socketPath: "/home/tarun/.docker/desktop/docker.sock" });

async function createContainer() {
    const container = await docker.createContainer({
        Image: "node:22.13-slim",
        Tty: true,
        AttachStdout: true,
        AttachStderr: true,
        AttachStdin: true,
        OpenStdin: true,
        StdinOnce: false,
        Cmd: ["/bin/bash"],
    });

    await container.start();
    return container;
}

io.on("connection", async (socket) => {
    console.log(`User connected: ${socket.id}`);

    const container = await createContainer();
    console.log(`Started container: ${container.id}`);

    // Create an exec instance that will persist
    const exec = await container.exec({
        Cmd: ["/bin/bash"],
        AttachStdin: true,
        AttachStdout: true,
        AttachStderr: true,
        Tty: true,
    });

    // Start the exec instance
    const stream = await exec.start({ 
        hijack: true, 
        stdin: true 
    });

    // Properly handle stream reading
    stream.on('data', (chunk) => {
        const output = chunk.toString('utf8');
        // console.log('Container output:', output);
        socket.emit('terminal_output', output);
    });

    // Handle errors
    stream.on('error', (err) => {
        console.error('Stream error:', err);
        socket.emit('terminal_error', err.toString());
    });

    // Receive and execute terminal input
    socket.on('terminal_input', async (input) => {
        try {
            // Ensure input ends with a newline to execute the command
            const commandWithNewline = input.endsWith('\n') ? input : input + '\n';
            
            // Write the input to the stream
            stream.write(commandWithNewline, 'utf8', (err) => {
                if (err) {
                    console.error('Error writing to stream:', err);
                    socket.emit('terminal_error', err.toString());
                }
            });
        } catch (error: any) {
            console.error('Error processing terminal input:', error);
            socket.emit('terminal_error', error.toString());
        }
    });

    socket.on('disconnect', async () => {
        console.log(`User disconnected: ${socket.id}`);
        try {
            await container.stop();
            await container.remove();
        } catch (error) {
            console.error('Error stopping/removing container:', error);
        }
    });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});