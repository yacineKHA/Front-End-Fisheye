// Rassemble tous les éléments pour le portfolio et retourne le conteneur complet
function createMediaElementsOnPortfolio(linkContainer, media) {
    const container = createPortfolioCard();
    const bottomContainer = createBottomContainer(media);
    const mediaElement = createMediaElement(media);

    linkContainer.appendChild(mediaElement);
    container.appendChild(linkContainer);
    container.appendChild(bottomContainer);

    return container;
}

// Crée un conteneur pour la card du portfolio
function createPortfolioCard() {
    const container = document.createElement('article');
    container.classList.add("portfolio_card");
    return container;
}

// Crée le conteneur inférieur de la card du portfolio en y ajoutant titre et les likes
function createBottomContainer(media, setTotalLikes) {
    const bottomContainer = document.createElement('div');
    bottomContainer.classList.add("portfolio_card__bottom_container");

    const title = createTitle(media.title);
    const likesContainer = createLikesContainer(media, setTotalLikes);

    bottomContainer.appendChild(title);
    bottomContainer.appendChild(likesContainer);

    return bottomContainer;
}

// Crée un titre pour la card du portfolio
function createTitle(titleText) {
    const title = document.createElement('p');
    title.classList.add("card__title");
    title.textContent = titleText;
    return title;
}

// Crée le conteneur des likes avec l'icône et le nombre de likes
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

// Crée un élément média (image ou vidéo) en fonction du type de média
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

// Gère la sélection de tri et met à jour l'affichage du portfolio en fonction de l'option sélectionnée
async function handleSortSelect(photographer) {
    const mediaItems = await getPhotographerPortfolio(photographer);
    const sortSelect = document.getElementById('sort-select');

    sortSelect.addEventListener('change', function () {
        const selectedOption = this.value;
        sortMedia(selectedOption, mediaItems);
    });
}

// Rafraîchit l'affichage du portfolio avec les card triés
function refreshPortfolioDisplay(mediaItems) {
    const portfolioContainer = document.querySelector('.photograph-portfolio');
    portfolioContainer.innerHTML = '';
    Photographer.updateTotalLikesDisplay(true);
    mediaItems.forEach(media => {
        Photographer.incrementLikes(media.likes);
        const linkContainer = document.createElement('a');
        linkContainer.setAttribute("class", "card__img_link_container");
        linkContainer.setAttribute('tabindex', '0'); 
        const mediaElement = createMediaElementsOnPortfolio(linkContainer, media);
        portfolioContainer.appendChild(mediaElement);
        handleClickOnMediaItem(linkContainer, media, mediaItems);
    });
}

// Trie les card du portfolio en fonction de l'option de tri sélectionnée
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