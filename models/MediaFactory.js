class MediaFactory {

    constructor() {
        this.likes = 0;
    }
    createMedia(type, fileName, title, likes, date, price) {
        switch(type) {
            case 'Photo':
                return new Photo(fileName, title, likes, date, price);
            case 'Video':
                return new Video(fileName, title, likes, date, price);
        }
    }

    incrementLikes() {
        this.likes++;
        console.log(this.likes);
        Photographer.incrementLikes(this.likes);
    }
}