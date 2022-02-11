const fetchCityes = async (query: string) => {
    let response = await fetch(``);

    if (response.ok) {
        let json = await response.json();
        return json;
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
};

export const api = {
    fetchCityes
}