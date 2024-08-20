class Photographer {

    static totalLikes = 0;

    constructor({ name, id, city, country, tagline, price, portrait }) {
        this.name = name;
        this.id = id;
        this.city = city;
        this.country = country;
        this.tagline = tagline;
        this.price = price;
        this.portrait = portrait;
        this.totalLikes = 0;
    }

    static incrementLikes(likes) {
        this.totalLikes += likes;
        this.updateTotalLikesDisplay();
    }

    static updateTotalLikesDisplay(resetTotalValue = false)  {
        if(resetTotalValue) this.totalLikes = 0;
        const totalLikesText = document.querySelector('.total-likes');
        totalLikesText.textContent = `${this.totalLikes}`;
    }

    static updatePricePerDayDisplay(pricePerDay) {
        const pricePerDayText = document.querySelector('.price-per-day');
        pricePerDayText.textContent = `${pricePerDay}€/jour`;
    }
}