/*function portfolioTemplate(data) {
    
    const { name } = data;

    const media = `assets/photographers/${name}`;

    function getUserPortfolio() {
        const portfolioSection = 
        article.addEventListener('click', () => {
            window.location.href = `photographer.html?id=${id}`;
        });
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("class", "photographer__profil-img");
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const localisation = document.createElement( 'p' );
        localisation.textContent = `${city}, ${country}`;
        const taglineContent = document.createElement( 'p' );
        taglineContent.textContent = tagline;
        const priceContent = document.createElement( 'p' );
        priceContent.textContent = `${price}€/jour`;
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(localisation);
        article.appendChild(taglineContent);
        article.appendChild(priceContent);
        return (article);
    }

    return { getUserPortfolio }
}*/
function createMediaElementsOnPortfolio(linkContainer, media) {
    const container = createPortfolioCard();
    const bottomContainer = createBottomContainer(media);
    const mediaElement = createMediaElement(media);

    linkContainer.appendChild(mediaElement);
    container.appendChild(linkContainer);
    container.appendChild(bottomContainer);

    return container;
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
        const mediaElement = createMediaElementsOnPortfolio(linkContainer, media);
        portfolioContainer.appendChild(mediaElement);
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

function contactModalTitle(photographer) {
    const title = document.querySelector("#contact_modal__title");
    title.textContent = `Contactez moi ${photographer.name}`;
}

