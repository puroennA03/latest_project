// functions.js
function captureAndShare() {
    const video = document.getElementById('cameraFeed'); // Get the video feed

    if (!video) {
        alert("No video feed available.");
        return;
    }

    // Create a canvas to capture the current frame from the video
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current frame from the video onto the canvas
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas content to a base64 image
    const imageDataUrl = canvas.toDataURL('image/png');

    // Store the image in localStorage
    storePhoto(imageDataUrl);

    // Optionally reload the gallery page to view the uploaded photo
    window.location.href = 'gallery.html';
}

// Store photo in localStorage
function storePhoto(src) {
    let storedPhotos = JSON.parse(localStorage.getItem('photos')) || [];
    storedPhotos.push(src); // Add the new photo
    localStorage.setItem('photos', JSON.stringify(storedPhotos)); // Store the updated list
}
function searchHabitat() {
    const animalName = document.getElementById('animalSearchInput').value.trim();
    const resultElement = document.getElementById('searchResult');

    if (!animalName) {
        resultElement.textContent = "Please enter an animal name.";
        return;
    }

    fetch(`http://localhost:3000/api/search?animal=${encodeURIComponent(animalName)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            resultElement.textContent = data.message || "No data found.";
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            resultElement.textContent = `Error: ${error.message}`;
        });
}
