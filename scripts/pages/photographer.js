const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');

function displayPhotographerDetails(photographer) {
    const photographerDetails = document.querySelector('.text-container');
    const photographerImage = document.querySelector('.image-container');

    const img = createPhotographerImage(photographer);
    const h2 = createPhotographerName(photographer);
    const localisation = createPhotographerLocation(photographer);
    const taglineContent = createPhotographerTagline(photographer);

    photographerDetails.appendChild(h2);
    photographerDetails.appendChild(localisation);
    photographerDetails.appendChild(taglineContent);
    photographerImage.appendChild(img);
}

async function displayPhotographerPortfolio(photographer) {
    const mediaItems = await getPhotographerPortfolio(photographer);
    photographer.totalLikes = mediaItems.reduce((acc, media) => acc + media.likes, 0);

    sortMedia('popularity', mediaItems);
    refreshPortfolioDisplay(mediaItems, photographer);
    await handleSortSelect(photographer);
    Photographer.updatePricePerDayDisplay(photographer.price);
}

async function init() {
    const photographersData = await getPhotographersData();
    if (photographersData && photographersData.photographers) {
        const photographer = getPhotographerById(photographerId, photographersData.photographers);
        console.log(photographer);
        if (photographer) {
            displayPhotographerDetails(photographer);
            await displayPhotographerPortfolio(photographer);
            contactModalTitle(photographer)
        } else {
            console.error("Aucun photographe touvé.");
        }
    } else {
        console.error("Aucune donnée.");
    }
}

init();
