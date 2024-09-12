// Gestions des événements de la galerie
function navigationGallery(previousButton, nextButton, mediaItems, currentIndex, setCurrentIndex) {
    previousButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex -= 1);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < mediaItems.length - 1) {
            setCurrentIndex(currentIndex += 1)
        }
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            if (currentIndex > 0) {
                setCurrentIndex(currentIndex -= 1);
            }
        } else if (event.key === 'ArrowRight') {
            if (currentIndex < mediaItems.length - 1) {
                setCurrentIndex(currentIndex += 1)
            }
        }
    });
}

function showPreviousMedia(currentIndex, setCurrentIndex) {
    if (currentIndex > 0) {
        setCurrentIndex(currentIndex -= 1);
    }
}

function showNextMedia(currentIndex, setCurrentIndex, mediaItems) {
    if (currentIndex < mediaItems.length - 1) {
        setCurrentIndex(currentIndex += 1)
    }
}

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