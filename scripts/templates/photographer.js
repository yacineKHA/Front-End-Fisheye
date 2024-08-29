function photographerTemplate(data) {
    const { id, name, city, country, tagline, price, portrait } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const link = document.createElement('a');
        const h2 = document.createElement('h2');
        const img = document.createElement('img');
        const localisation = document.createElement('p');
        const taglineContent = document.createElement('p');
        const priceContent = document.createElement('p');

        link.setAttribute('href', `photographer.html?id=${id}`);
        link.setAttribute('aria-label',name);

        img.setAttribute("src", picture);
        img.setAttribute("class", "photographer__profil-img");
        img.setAttribute("alt", "");

        localisation.setAttribute("class", "photographer__localisation");

        h2.textContent = name;
        localisation.textContent = `${city}, ${country}`;
        taglineContent.textContent = tagline;
        priceContent.textContent = `${price}€/jour`;

        link.appendChild(img);
        link.appendChild(h2);

        article.appendChild(link);
        article.appendChild(localisation);
        article.appendChild(taglineContent);
        article.appendChild(priceContent);

        return article;
    }

    return { name, picture, getUserCardDOM };
}