class MediaFactory {
    createMedia(type, fileName, title) {
        switch(type) {
            case 'Photo':
                return new Photo(fileName, title);
            case 'Video':
                return new Video(fileName, title);
            default:
                throw new Error(`Type inconnu: ${type}`);
        }
    }
}