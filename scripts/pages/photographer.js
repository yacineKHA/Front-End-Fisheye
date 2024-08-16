
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');


console.log("Photographer ID:", photographerId);

async function getPhotographersData() {
    const photographers = await getPhotographers();
    if (photographers) {
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
    img.setAttribute("class", "photographer__profil-img");
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


async function displayPhotographerPortfolio(name) {
    const portfolioContainer = document.querySelector('.photograph-portfolio');
    const mediaItems = await getPhotographerPortfolio(name);
    mediaItems.forEach(media => {
        if (media.type === 'Photo') {
            const container = document.createElement('div');
            const linkContainer = document.createElement('a');

            handleClickOnMediaItem(linkContainer, media, mediaItems);

            console.log(media);
            const img = document.createElement('img');
            const title = document.createElement('p');
            title.textContent = media.title;
            img.setAttribute("src", media.fileName);
            img.setAttribute("alt", media.title);
            img.setAttribute("class", "card__img");
            linkContainer.setAttribute("class", "card__img_link_container");
            title.setAttribute("class", "card__title");
            linkContainer.appendChild(img);
            container.setAttribute("class", "portfolio_card");
            container.appendChild(linkContainer);
            portfolioContainer.appendChild(container);
            container.appendChild(title);
        } else if (media.type === 'Video') {
            const container = document.createElement('div');
            const linkContainer = document.createElement('a');
            handleClickOnMediaItem(linkContainer, media, mediaItems);

            const video = document.createElement('video');
            const title = document.createElement('p');
            title.textContent = media.title;
            video.setAttribute("src", media.fileName);
            video.setAttribute("controls", true);
            video.setAttribute("class", "card__video");
            video.preload = "auto";
            video.controls = false;
            linkContainer.setAttribute("class", "card__img_link_container");
            linkContainer.appendChild(video);
            container.setAttribute("class", "portfolio_card");
            title.setAttribute("class", "card__title");
            container.appendChild(linkContainer);
            portfolioContainer.appendChild(container);
            container.appendChild(title);
        }
    });
}

async function init() {
    const photographersData = await getPhotographersData();
    if (photographersData && photographersData.photographers) {
        const photographer = getPhotographerById(photographerId, photographersData.photographers);
        console.log("Photographer:", photographer);

        if (photographer) {
            displayPhotographerDetails(photographer);
            console.log("name: ", photographer.name);
            displayPhotographerPortfolio(photographer.name);
        } else {
            console.error("Aucun photographe touvé.");
        }
    } else {
        console.error("Aucune donnée.");
    }
}

init();



//console.log("photographer: ", getPhotographerById(photographerId, getPhotographersData()))

