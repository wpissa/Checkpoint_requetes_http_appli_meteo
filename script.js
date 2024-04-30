const Input = document.querySelector('#rechercheinput')
const buttun = document.querySelector('#search-btn')
document.addEventListener('DOMContentLoaded', () => {
    // Fonction pour récupérer les données météorologiques
    async function getWeatherData(city) {
        const apiKey = '20a15156c083d53f2f36ad2f47739437';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Impossible de récupérer les données météorologiques');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Une erreur s\'est produite:', error);
        }
    }

    // Fonction pour afficher les données météorologiques
    async function displayWeather(city) {
        const weatherData = await getWeatherData(city);
        console.log(weatherData);
        // Mettre à jour le contenu HTML pour afficher les informations météorologiques
        const weatherContainer = document.querySelector('.container');
        weatherContainer.innerHTML = `
            <h1>Météo à ${city}</h1>
            <p>Température: ${weatherData.main.temp}°C</p>
            <p>Description: ${weatherData.weather[0].description}</p>
            <p>Humidité: ${weatherData.main.humidity}%</p>
            <p>Vitesse du vent: ${weatherData.wind.speed} m/s</p>
        `;
    }

    // Appel de la fonction displayWeather avec la ville par défaut
    let defaultCity = '';
    buttun.addEventListener('click', _ =>{
        defaultCity = Input.value
        displayWeather(defaultCity);
    })
});