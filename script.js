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
            return new Promise((resolve, reject)=>{
                resolve(response);
            })
        });
}

// Create an array of promises to fetch all images
let imagePromises = [];
btn.addEventListener('click', () => {
    imagePromises = images.map(obj => fetchImage(obj.url));
    // Use Promise.all to handle all promises
    Promise.all(imagePromises)
        .then(imageUrls => {
            output.innerHTML = '';
            imageUrls.map(imageObj => {
                const imageUrl = imageObj.url.split("?")[0];
                console.log(imageUrl);
                output.innerHTML += `
                <img src='${imageUrl}' alt='image loading...'>
                `;
            })
        })
        .catch(error => {
            console.error('Error loading images:', error);
        });
})
