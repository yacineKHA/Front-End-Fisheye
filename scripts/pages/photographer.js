const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');


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
    img.classList.add("photographer__profil-img");

    const h2 = document.createElement('h2');
    h2.textContent = photographer.name;

    const localisation = document.createElement('p');
    localisation.classList.add("photograph-header__localisation");
    localisation.textContent = `${photographer.city}, ${photographer.country}`;

    const taglineContent = document.createElement('p');
    taglineContent.classList.add("photograph-header__tagline");
    taglineContent.textContent = photographer.tagline;

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

function createMediaElementsOnPortfolio(linkContainer, media) {
    const portfolioContainer = document.querySelector('.photograph-portfolio');
    const container = createPortfolioCard();
    const bottomContainer = createBottomContainer(media);
    const mediaElement = createMediaElement(media);

    linkContainer.appendChild(mediaElement);
    container.appendChild(linkContainer);
    container.appendChild(bottomContainer);
    portfolioContainer.appendChild(container);
}

function createPortfolioCard() {
    const container = document.createElement('article');
    container.classList.add("portfolio_card");
    return container;
}

function createBottomContainer(media, setTotalLikes) {
    const bottomContainer = document.createElement('div');
    bottomContainer.classList.add("portfolio_card__bottom_container");

    const title = createTitle(media.title);
    const likesContainer = createLikesContainer(media, setTotalLikes);

    bottomContainer.appendChild(title);
    bottomContainer.appendChild(likesContainer);

    return bottomContainer;
}

function createTitle(titleText) {
    const title = document.createElement('p');
    title.classList.add("card__title");
    title.textContent = titleText;
    return title;
}

function createLikesContainer(media) {
    const fragment = document.createDocumentFragment();
    const likesContainer = document.createElement('div');
    const likeIcon = document.createElement('img');
    const numberOfLikes = document.createElement('p');

    likesContainer.classList.add("portfolio_card__likes_container");
    likeIcon.setAttribute("src", "../assets/icons/like.png");
    likeIcon.setAttribute("alt", "like icon");
    likeIcon.classList.add("like-icon");
    likeIcon.setAttribute("tabindex", "0");

    numberOfLikes.classList.add("card__number_of_likes");
    numberOfLikes.textContent = media.likes;

    let isLiked = false;
    const mediaFactory = new MediaFactory(); 

    const toggleLike = () => {
        if (isLiked) {
            media.likes--;
            mediaFactory.decrementLikes();
        } else {
            media.likes++;
            mediaFactory.incrementLikes();
        }
        isLiked = !isLiked;
        numberOfLikes.textContent = media.likes;
    };

    likeIcon.addEventListener('click', toggleLike);

    likeIcon.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            toggleLike();
        }
    });

    likesContainer.appendChild(numberOfLikes);
    likesContainer.appendChild(likeIcon);
    fragment.appendChild(likesContainer);

    return fragment;
}

function createMediaElement(media) {
    let element;
    if (media instanceof Photo) {
        element = document.createElement('img');
        element.classList.add("card__img");
        element.setAttribute("src", media.fileName);
        element.setAttribute("alt", media.title);
        
    } else if (media instanceof Video) {
        element = document.createElement('video');
        element.setAttribute("src", media.fileName);
        element.setAttribute("controls", true);
        element.classList.add("card__video");
        element.preload = "auto";
        element.controls = false;
    }
    return element;
}

async function handleSortSelect(photographer) {
    const mediaItems = await getPhotographerPortfolio(photographer);
    const sortSelect = document.getElementById('sort-select');

    sortSelect.addEventListener('change', function () {
        const selectedOption = this.value;
        sortMedia(selectedOption, mediaItems);
    });
}

function refreshPortfolioDisplay(mediaItems) {
    const portfolioContainer = document.querySelector('.photograph-portfolio');
    portfolioContainer.innerHTML = '';
    Photographer.updateTotalLikesDisplay(true);
    mediaItems.forEach(media => {
        Photographer.incrementLikes(media.likes);
        const linkContainer = document.createElement('a');
        linkContainer.setAttribute("class", "card__img_link_container");
        linkContainer.setAttribute('tabindex', '0');
        createMediaElementsOnPortfolio(linkContainer, media);
        handleClickOnMediaItem(linkContainer, media, mediaItems);
    });
}

function sortMedia(sortOption, mediaItems) {

    const sortOptions = ['popularity', 'date', 'title'];

    if (sortOption === sortOptions[0]) {
        mediaItems.sort((a, b) => b.likes - a.likes);
    } else if (sortOption === sortOptions[1]) {
        mediaItems.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOption === sortOptions[2]) {
        mediaItems.sort((a, b) => a.title.localeCompare(b.title));
    }
    refreshPortfolioDisplay(mediaItems);
}

function contactModalTitle (photographer) {
    const title = document.querySelector("#contact_modal__title");
    title.textContent =`Contactez moi ${photographer.name}`;
}

async function init() {
    const photographersData = await getPhotographersData();
    if (photographersData && photographersData.photographers) {
        const photographer = getPhotographerById(photographerId, photographersData.photographers);
        
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
