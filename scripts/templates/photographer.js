function photographerTemplate(data) {

    const { id, name, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.addEventListener('click', () => {
            window.location.href = `photographer.html?id=${id}`;
        });
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("class", "photographer__profil-img")
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const localisation = document.createElement( 'p' );
        localisation.setAttribute("class", "photographer__localisation");
        localisation.textContent = `${city}, ${country}`;
        const taglineContent = document.createElement( 'p' );
        taglineContent.textContent = tagline;
        const priceContent = document.createElement( 'p' );
        priceContent.textContent = `${price}€/jour`;
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(localisation);
        article.appendChild(taglineContent);
        article.appendChild(priceContent);
        
        return (article);
    }

    return { name, picture, getUserCardDOM }
}