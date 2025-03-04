const { Docker } = require('node-docker-api');

const docker = new Docker();

async function testDocker() {
    try {
        const images = await docker.image.list();
        console.log("Images:", images);
    } catch (error) {
        console.error("Docker API error:", error);
    }
}
// sudo apt-get install -y docker-ce=5:26.0.0-1~ubuntu.24.04~noble docker-ce-cli=5:26.0.0-1~ubuntu.24.04~noble containerd.io docker-buildx-plugin docker-compose-plugin

testDocker();
