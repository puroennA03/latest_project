// functions.js
function captureAndShare() {
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

    fetch(`/api/search?animal=${encodeURIComponent(animalName)}`)
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
