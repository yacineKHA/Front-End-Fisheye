// Crée une image avec portrait du photographe
function createPhotographerImage(photographer) {
    const picture = `assets/photographers/${photographer.portrait}`;
    const img = document.createElement('img');
    img.setAttribute("src", picture);
    img.setAttribute("alt", photographer.name);
    img.classList.add("photographer__profil-img");
    return img;
}

// Crée un titre avec le nom du photographe
function createPhotographerName(photographer) {
    const h2 = document.createElement('h2');
    h2.textContent = photographer.name;
    return h2;
}

// Crée un paragraphe avec la localisation du photographe
function createPhotographerLocation(photographer) {
    const localisation = document.createElement('p');
    localisation.classList.add("photograph-header__localisation");
    localisation.textContent = `${photographer.city}, ${photographer.country}`;
    return localisation;
}

// Crée un paragraphe avec la tagline du photographe
function createPhotographerTagline(photographer) {
    const taglineContent = document.createElement('p');
    taglineContent.classList.add("photograph-header__tagline");
    taglineContent.textContent = photographer.tagline;
    return taglineContent;
}