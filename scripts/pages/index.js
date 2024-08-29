async function displayData(photographersData) {
    const photographersSection = document.querySelector(".photographer_section");

    photographersData
        .map(photographerData => {
            return new Photographer(photographerData)
        })
        .forEach(photographer => {

            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
}

async function init() {
    const photographersData = await getPhotographers();
    if (photographersData && photographersData.photographers) {
        displayData(photographersData.photographers);
    } else {
        console.error("Pas de photographes.");
    }
}

init();

