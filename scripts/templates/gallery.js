function handleGallery(mediaItems, media) {
    const galleryContainer = document.querySelector('#gallery_modal');
    const closeButton = document.querySelector('.gallery_modal__close-modal');
    const mediaContainer = document.querySelector('.gallery_modal__media_container');
    const galleryTitle = document.querySelector('.gallery_modal__title');
    const previousButton = document.querySelector('.gallery_modal__previous');
    const nextButton = document.querySelector('.gallery_modal__next');

    let currentIndex = mediaItems.findIndex(item => item.title === media.title);
    let lastFocusedElement = document.activeElement; // Sauvegarder l'élément actuellement focusé

    function updateGallery(media) {
        mediaContainer.innerHTML = ''; //Vider media précédent
        const element = createMediaElementInGallery(media);
        element.setAttribute('role', 'option');
        element.setAttribute('aria-selected', 'true');
        element.setAttribute('tabindex', '0');

        mediaContainer.appendChild(element);
        galleryTitle.textContent = media.title;
        mediaContainer.focus();
        element.focus(); // Déplacer le focus vers l'image ouverte
    }

    function setCurrentIndex(newIndex) {
        currentIndex = newIndex;
        updateGallery(mediaItems[currentIndex]);
    }

    navigationGallery(previousButton, nextButton, mediaItems, currentIndex, setCurrentIndex);

    galleryContainer.style.display = "flex";
    closeGalleryModal(closeButton, galleryContainer, lastFocusedElement);

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

function closeGalleryModal(closeButton, galleryContainer, lastFocusedElement) {
    const closeModal = () => {
        galleryContainer.style.display = "none";
        lastFocusedElement.focus(); // Restaurer le focus à l'élément qui a déclenché l'ouverture de la galerie
        closeButton.removeEventListener('click', closeModal);
        document.removeEventListener('keydown', handleEscapeKey);
    };

    closeButton.addEventListener('click', closeModal);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
}

