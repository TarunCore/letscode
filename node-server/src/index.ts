import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import Docker from 'dockerode';
// import {pipleline}
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "*" },
});
// https://stackoverflow.com/questions/32542530/nodejs-pty-timing-commands
const docker = new Docker();

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

    const exec = await container.exec({
        Cmd: ["/bin/bash"],
        AttachStdin: true,
        AttachStdout: true,
        AttachStderr: true,
        Tty: true,
    });

    const stream = await exec.start({ hijack: true, stdin: true });

    // Forward container output to the client
    stream.on("data", (chunk) => {
        console.log(chunk.toString());
        socket.emit("terminal_output", chunk.toString());
    });

    // Receive user input and send it to the container
    socket.on("terminal_input", (input) => {
        stream.write(input);
    });

    socket.on("disconnect", async () => {
        console.log(`User disconnected: ${socket.id}`);
        await container.stop();
        await container.remove();
    });
});


app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Use server.listen instead of app.listen
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});