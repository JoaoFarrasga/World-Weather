const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

const APIKey = '7ece734db73e21dd84af8c64ad909415';

const getCoordData = async (city) => {

    const apiGeolocationurl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`;

    const res = await fetch(apiGeolocationurl);
    const data = await res.json();

    return data;
};

const getWeatherData = async (city) => {

    const data = await getCoordData(city)

    if (data.cod === "404") {

        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
    }

    error404.style.display = 'none';
    error404.classList.remove('fadeIn');

    var lat, lon;

    lat = data.lat;
    lon = data.lon;

    const apiWeatherurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`;

    const res = await fetch(apiWeatherurl);
    const data2 = await res.json();

    return data2;
}

const showWeatherData = async (city) => {
  
    const data = await getWeatherData(city);

    if (data.cod === "404") {

        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
    }

    error404.style.display = 'none';
    error404.classList.remove('fadeIn');

    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind_speed = document.querySelector('.weather-details .wind span');

    switch (json.weather[0].main) {

        case 'Clear':
            image.src = 'Images/clear.png';
            break;

        case 'Rain':
            image.src = 'Images/rain.png';
            break;

        case 'Snow':
            image.src = 'Images/snow.png';
            break;


        case 'Clouds':
            image.src = 'Images/cloud.png';
            break;

        case 'Haze':
            image.src = 'Images/mist.png';
            break;
        
        default:
            image.src = '';
    }

    temperature.innerHTML = parseInt(data.main.temp);
    description.innerText = data.weather[0].description;
    humidity.innerText = `${data.main.humidity}%`;
    wind_speed.innerText = `${data.wind.speed}km/h`;

    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = '590px';
}

search.addEventListener('click', async (e) => {
    if (e.code === "Enter") {
    const city = e.target.value;
    
    showWeatherData(city);
    }
});