async function getPhotographers() {
    const URL = "../../data/photographers.json";

    try {
        const response = await fetch(URL);
        const json = await response.json();

        if (json) {
            return json;
        }

    } catch (error) {
        console.log("respError: ", error)
    }
}

async function getPhotographerPortfolio(photographer) {
    const URL = "../../data/photographers.json";
    const MEDIA_URL = "../../assets/photographers";

    try {
        const response = await fetch(URL);
        const data = await response.json();
        const mediaItems = data.media.filter(media => media.photographerId === photographer.id).map(media => {
            const type = media.image ? 'Photo' : 'Video';
            const fileName = `${MEDIA_URL}/${photographer.id}/${media.image || media.video}`;
            const { title, likes, date, price } = media;
            const mediaFactory = new MediaFactory();
            return mediaFactory.createMedia(type, fileName, title, likes, date, price);
        });

        return mediaItems;
    } catch (error) {
        console.error('Erreur:', error);
        return [];
    }
}

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