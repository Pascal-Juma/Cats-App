document.addEventListener("DOMContentLoaded", () => {
const factsInput = document.getElementById("catsFacts");
const photosInput = document.getElementById("catsPhotos");
const factsForm = document.querySelector(".facts-btn");
const photosForm = document.querySelector(".photos-btn");
const factsContainer = document.querySelector(".randomFacts ol");
const photosContainer = document.querySelector(".lowerSection");
const spinner = document.getElementById("spinner");
const errorContainer = document.getElementById("error-message");

function showError(message) {
    errorContainer.innerHTML = `<p>${message}</p>`;
errorContainer.style.display = "block";
}

function hideError() {
errorContainer.style.display = "none";
}

async function fetchCatFacts(limit) {
showSpinner();
try {
    const response = await fetch(
    `https://meowfacts.herokuapp.com/?count=${limit}`
    );
    const data = await response.json();
    hideSpinner();
    return data.data;
} catch (error) {
    console.error("Error fetching cat facts:", error);
    setTimeout(() => {
    showError("There was an error. Please try again later.");
    hideSpinner();
    }, 1000);
    return [];
}
}

async function fetchCatImages(limit) {
showSpinner();
try {
    const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=${limit}&size=small`
    );
    const data = await response.json();
    hideSpinner();
    return data.map((img) => img.url);
} catch (error) {
    console.error("Error fetching cat images:", error);
    setTimeout(() => {
    showError("There was an error. Please try again later.");
    hideSpinner();
    }, 1000);
    return [];
}
}

function displayFacts(facts) {
if (facts.length === 0) return;

const imageGallery = document.querySelector(".image-gallery");
if (imageGallery) {
    imageGallery.remove();
}

factsContainer.innerHTML = "";

facts.forEach((fact) => {
    const li = document.createElement("li");
    li.textContent = fact;
    factsContainer.appendChild(li);
});
}

function displayImages(images) {
if (images.length === 0) return;

factsContainer.innerHTML = "";

let imageContainer = document.querySelector(".image-gallery");

if (imageContainer) {
    imageContainer.remove();
}

imageContainer = document.createElement("div");
imageContainer.classList.add("image-gallery");
photosContainer.appendChild(imageContainer);

images.forEach((url) => {
    const img = document.createElement("img");
    img.src = url;
    img.alt = "Cat Image";
    img.classList.add("cat-image");
    imageContainer.appendChild(img);
});
}

function showSpinner() {
factsContainer.innerHTML = "";
const imageGallery = document.querySelector(".image-gallery");
if (imageGallery) {
    imageGallery.remove();
}
spinner.style.display = "block";
}

function hideSpinner() {
spinner.style.display = "none";
}

factsForm.addEventListener("click", async (event) => {
event.preventDefault();
hideError();
const limit = Math.min(50, Math.max(1, parseInt(factsInput.value) || 1));
const facts = await fetchCatFacts(limit);
displayFacts(facts);
});

photosForm.addEventListener("click", async (event) => {
event.preventDefault();
hideError();
const limit = Math.min(10, Math.max(1, parseInt(photosInput.value) || 1));
const images = await fetchCatImages(limit);
displayImages(images);
});
});
