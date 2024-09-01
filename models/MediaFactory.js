class MediaFactory {

    constructor() {
        this.likes = 0;
    }

    createMedia(type, fileName, title, likes, date, price) {
        switch (type) {
            case 'Photo':
                return new Photo(fileName, title, likes, date, price);
            case 'Video':
                return new Video(fileName, title, likes, date, price);
        }
    }

    incrementLikes() {
        this.likes =0;
        this.likes++;
        Photographer.incrementLikes(this.likes);
    }

    decrementLikes() {
        this.likes -1;
        Photographer.decrementLikes(this.likes);
    }
}