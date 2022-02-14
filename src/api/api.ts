const getWetherByCityName = async (city: string) => { 
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_KEY}&lang=ru`);
    
    if (response.ok) {
        let json = await response.json();        
        
        return json;
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
};

export const api = {
    getWetherByCityName
}