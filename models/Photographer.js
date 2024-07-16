class Photographer {
    constructor({ name, id, city, country, tagline, price, portrait }) {
        this.name = name;
        this.id = id;
        this.city = city;
        this.country = country;
        this.tagline = tagline;
        this.price = price;
        this.portrait = portrait;
    }

    // Getters
    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getCity() {
        return this.city;
    }

    getCountry() {
        return this.country;
    }

    getTagline() {
        return this.tagline;
    }

    getPrice() {
        return this.price;
    }

    getPortrait() {
        return this.portrait;
    }
}