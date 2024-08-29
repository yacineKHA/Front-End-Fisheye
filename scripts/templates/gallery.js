function handleClickOnMediaItem(container, media, mediaItems) {

    container.addEventListener('click', () => {
        handleGallery(mediaItems, media);
    });

    container.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleGallery(mediaItems, media);
        }
    });
}

function handleGallery(mediaItems, media) {
    const galleryContainer = document.querySelector('#gallery_modal');
    const closeButton = document.querySelector('.gallery_modal__close-modal');
    const mediaContainer = document.querySelector('.gallery_modal__media_container');
    const galleryTitle = document.querySelector('.gallery_modal__title');
    const previousButton = document.querySelector('.gallery_modal__previous');
    const nextButton = document.querySelector('.gallery_modal__next');

    let currentIndex = mediaItems.findIndex(item => item.title === media.title);

    function updateGallery(media) {
        mediaContainer.innerHTML = '';
        const element = createMediaElementInGallery(media);
        mediaContainer.appendChild(element);
        galleryTitle.textContent = media.title;
    }

    function setCurrentIndex(newIndex) {
        currentIndex = newIndex;
        updateGallery(mediaItems[currentIndex]);
    }

    navigationGallery(previousButton, nextButton, mediaItems, currentIndex, setCurrentIndex);

    galleryContainer.style.display = "flex";
    closeGalleryModal(closeButton, galleryContainer);

    updateGallery(media);
}

function createMediaElementInGallery(media) {
    let element;
    if (media instanceof Photo) {
        element = document.createElement('img');
        element.setAttribute("class", "gallery_modal__photo");
        element.setAttribute("src", media.fileName);
        element.setAttribute("alt", media.title);
    } else if (media instanceof Video) {
        element = document.createElement('video');
        element.setAttribute("src", media.fileName);
        element.setAttribute("alt", media.title);
        element.setAttribute("class", "gallery_modal__video");
        element.setAttribute("controls", "true");
        element.setAttribute("autoplay", "true");
    }
    return element;
}

function closeGalleryModal(closeButton, galleryContainer) {
    const closeModal = () => {
        galleryContainer.style.display = "none";
    };

    closeButton.addEventListener('click', closeModal);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
}

