const Docker = require('dockerode');
const docker = new Docker({ socketPath: '/home/tarun/.docker/desktop/docker.sock' });

async function listDockerImages() {
    try {
        const images = await docker.listImages();
        console.log("Raw Docker Images Response:", images);
        console.log("Formatted List:");

        if (!images.length) {
            console.log("No images found.");
            return;
        }

        images.forEach((image, index) => {
            console.log(`${index + 1}. ${image.RepoTags?.join(', ') || '<none>'} (ID: ${image.Id})`);
        });

    } catch (error) {
        console.error("Error listing Docker images:", error);
    }
}

listDockerImages();
