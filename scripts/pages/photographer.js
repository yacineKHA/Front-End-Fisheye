
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');


console.log("Photographer ID:", photographerId);

async function getPhotographersData(){
    const photographers =  await getPhotographers();
    if(photographers) {
        return photographers;
    } else {
        return [];
    }
}


function getPhotographerById(id, photographers) {
    return photographers.find(photographer => photographer.id == id);
}

function displayPhotographerDetails(photographer) {
    const photographerDetails = document.querySelector('.text-container');
    const photographerImage = document.querySelector('.image-container');

    const picture = `assets/photographers/${photographer.portrait}`;
    const img = document.createElement('img');
    img.setAttribute("src", picture);
    img.setAttribute("alt", photographer.name);
    img.setAttribute("class", "photographer__profil-img")
    const h2 = document.createElement('h2');
    h2.textContent = photographer.name;
    const localisation = document.createElement('p');
    localisation.textContent = `${photographer.city}, ${photographer.country}`;
    const taglineContent = document.createElement('p');
    taglineContent.textContent = photographer.tagline;

    photographerDetails.appendChild(h2);
    photographerDetails.appendChild(localisation);
    photographerDetails.appendChild(taglineContent);
    photographerImage.appendChild(img);
}

async function init() {
    const photographersData = await getPhotographersData();
    if (photographersData && photographersData.photographers) {
        const photographer = getPhotographerById(photographerId, photographersData.photographers);
        console.log("Photographer:", photographer);

        if (photographer) {
            displayPhotographerDetails(photographer);
        } else {
            console.error("Photographer not found.");
        }
    } else {
        console.error("No photographers data found.");
    }
}

init();



//console.log("photographer: ", getPhotographerById(photographerId, getPhotographersData()))

