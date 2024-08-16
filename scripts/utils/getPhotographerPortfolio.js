
async function getPhotographerPortfolio(name) {
    try {
        const folderName = name.replace(/\s+/g, '-'); // Remplace les espaces par des tirets

        const response = await fetch(`../../assets/photographers/${folderName}`);
        console.log("API Response Status:", response.status);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        console.log("doc: ", doc);
        const links = doc.querySelectorAll('a');

        const mediaItems = [];
        links.forEach(link => {
            console.log("link: ", link);
            const fileName = link.getAttribute('href');
            let type;
            if (fileName.endsWith('.jpg') || fileName.endsWith('.png')) {
                type = 'Photo';
            } else if (fileName.endsWith('.mp4')) {
                type = 'Video';
            } else {
                return;
            }
            console.log("Type file: ", type);
            const mediaFactory = new MediaFactory();
            const title = extractName(fileName);
            console.log("Title: ", title);
            const media = mediaFactory.createMedia(type, fileName, title);
            mediaItems.push(media);
        });

        console.log("mediaItems:", mediaItems);
        return mediaItems;
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        return [];
    }
}


