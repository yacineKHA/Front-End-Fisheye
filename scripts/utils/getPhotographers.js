async function getPhotographers() {
    const URL = "../../data/photographers.json";

    try {
        const response = await fetch(URL);
        const json = await response.json();

        if (json) {
            return json;
        }

    } catch (error) {
        console.log("respError: ", error)
    }
}