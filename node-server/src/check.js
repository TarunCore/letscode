const Docker = require('dockerode');
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

async function checkDocker() {
    try {
        const version = await docker.version();
        console.log("Docker is reachable. Version:", version);
    } catch (error) {
        console.error("Docker is NOT reachable:", error);
    }
}

checkDocker();
