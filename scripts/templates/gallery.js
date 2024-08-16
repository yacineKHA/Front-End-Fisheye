function handleClickOnMediaItem(container, media, mediaItems) {
    container.addEventListener('click', () => {
        handleGallery(mediaItems, media);
    });
}

function handleGallery(mediaItems, media) {
    const galleryContainer = document.querySelector('#gallery_modal');
    const closeButton = document.querySelector('.gallery_modal__close-modal');
    const mediaContainer = document.querySelector('.gallery_modal__media_container');
    const galleryTitle = document.querySelector('.gallery_modal__title');
    const previousButton = document.querySelector('.gallery_modal__previous');
    const nextButton = document.querySelector('.gallery_modal__next');

    let currentIndex = mediaItems.findIndex(item => item.fileName === media.fileName);

    function updateGallery(media) {
        mediaContainer.innerHTML = '';

        if(media.type === 'Photo') {
            const img = document.createElement('img');
            img.setAttribute("class", "gallery_modal__photo");
            img.setAttribute("src", media.fileName);
            img.setAttribute("alt", media.title);
            mediaContainer.appendChild(img);
        } else if(media.type === 'Video') {
            const video = document.createElement('video');
            video.setAttribute("src", media.fileName);
            video.setAttribute("class", "gallery_modal__video");
            video.setAttribute("controls", "true");
            video.setAttribute("autoplay", "true");
            mediaContainer.appendChild(video);
        }

        galleryTitle.textContent = media.title;
    }

    function setCurrentIndex(newIndex) {
        currentIndex = newIndex;
        updateGallery(mediaItems[currentIndex]);
    }

    navigationGallery(previousButton, nextButton, mediaItems, currentIndex, setCurrentIndex);

    galleryContainer.style.display = "flex";
    closeButton.addEventListener('click', () => {
        galleryContainer.style.display = "none";
    });

    updateGallery(media);
}

