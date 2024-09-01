/*function portfolioTemplate(data) {
    
    const { name } = data;

    const media = `assets/photographers/${name}`;

    function getUserPortfolio() {
        const portfolioSection = 
        article.addEventListener('click', () => {
            window.location.href = `photographer.html?id=${id}`;
        });
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("class", "photographer__profil-img");
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const localisation = document.createElement( 'p' );
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

    return { getUserPortfolio }
}*/