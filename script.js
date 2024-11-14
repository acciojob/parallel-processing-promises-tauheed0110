//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
    { url: "https://picsum.photos/id/237/200/300" },
    { url: "https://picsum.photos/id/238/200/300" },
    { url: "https://picsum.photos/id/239/200/300" },
];



// Function to fetch an image and return a Promise
function fetchImage(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load image's URL: ${url}`);
            }
            return response.blob(); // Get the image as a Blob object
        });
}

// Create an array of promises to fetch all images
let imagePromises = [];
btn.addEventListener('click', () => {
    imagePromises = images.map(obj => {
        return fetchImage(obj.url);
    });
    // Use Promise.all to handle all promises
    Promise.all(imagePromises)
        .then(imageBlobs => {
            // imageBlobs is an array of Blob objects for each image
            output.textContent = '';
            imageBlobs.forEach((blob, index) => {
                // Create an Object URL for each image Blob and display it
                const imgUrl = URL.createObjectURL(blob);
                const imgElement = document.createElement('img');
                imgElement.src = imgUrl;
                output.appendChild(imgElement);
                console.log(`Image ${index + 1} loaded successfully.`);
            });
        })
        .catch(error => {
            console.error('Error loading images:', error);
        });
})
