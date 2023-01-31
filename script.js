// Récupérer tous les éléments du DOM modifiables
let citySearch      = '';
let cityDisplay     = document.querySelector('#city-display');
let img             = document.querySelector('#icon');
let temp            = document.querySelector('#temp');
let tempMin         = document.querySelector('#temp-min');
let tempFeelsLike   = document.querySelector('#feels-like');
let pressure        = document.querySelector('#pressure');
let humidity        = document.querySelector('#humidity');
let windSpeed       = document.querySelector('#wind');
let button          = document.querySelector('#magnifying-glass');
let form            = document.querySelector('#city-search');

// Fonction permettant de changer le background de body
function bodybackground (dayOrNight, weather) {
    if (dayOrNight == 'd') {
        switch (weather) {
            case 'Clear':
                document.body.style.backgroundImage = 'url("medias/day/clear.jpg")';
                break;
            case 'Clouds':
                document.body.style.backgroundImage = 'url("medias/day/clouds.jpg")';
                break;
            case 'Snow':
                document.body.style.backgroundImage = 'url("medias/day/snow.jpg")';
                break;
            case 'Mist':
            case 'Fog':
            case 'Haze':
                document.body.style.backgroundImage = 'url("medias/day/Fog.jpg")';
            break;
            case 'Rain':
            case 'Drizzle':
                document.body.style.backgroundImage = 'url("medias/day/rain.jpg")';
            break;
            case 'Thunderstorm':
            case 'Tornado':
                document.body.style.backgroundImage = 'url("medias/day/thunderstorm.jpg")';
            break;
            default : 
            document.body.style.backgroundImage = 'url("medias/day/others.jpg")'
        }
    } else {
        switch (weather) {
            case 'Clear':
                document.body.style.backgroundImage = 'url("medias/night/clear.jpg")';
                break;
            case 'Clouds':
                document.body.style.backgroundImage = 'url("medias/night/clouds.jpg")';
                break;
            case 'Snow':
                document.body.style.backgroundImage = 'url("medias/night/snow.jpg")';
                break;
            case 'Mist':
            case 'Fog':
            case 'Haze':
                document.body.style.backgroundImage = 'url("medias/night/Fog.jpg")';
            break;
            case 'Rain':
            case 'Drizzle':
                document.body.style.backgroundImage = 'url("medias/night/rain.jpg")';
            break;
            case 'Thunderstorm':
            case 'Tornado':
                document.body.style.backgroundImage = 'url("medias/night/thunderstorm.jpg")';
            break;
            default : 
            document.body.style.backgroundImage = 'url("medias/night/others.jpg")'
        }
    }
}

// Fonction en cas d'échec de la géolocalisation
function geolocationError () {
    citySearch = 'Paris';
    majData(citySearch);
}

//Appel de l'API en géolocalisant l'utilisateur
if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition( async (position) => {
        let data                = await fetch('https://api.openweathermap.org/data/2.5/weather?lon=' + position.coords.longitude + '&lat='+ position.coords.latitude + '&appid=efc0b67a43b8a0ef061f770e6ba10b53&units=metric'); //mettre la clé
        console.log('https://api.openweathermap.org/data/2.5/weather?lon=' + position.coords.longitude + '&lat='+ position.coords.latitude + '&appid=efc0b67a43b8a0ef061f770e6ba10b53&units=metric');
        let dataTransformed     = await data.json();
        let weather             = dataTransformed.weather[0].main;
        let icon                = dataTransformed.weather[0].icon;
        let dayOrNight          = icon[2];

        cityDisplay.innerText       = dataTransformed.name;
        temp.innerText              = dataTransformed.main.temp + "°C";
        tempMin.innerText           = dataTransformed.main.temp_min + "°C";
        tempFeelsLike.innerText     = dataTransformed.main.feels_like + "°C";
        pressure.innerText          = dataTransformed.main.pressure + "Pa";
        humidity.innerText          = dataTransformed.main.humidity + "%";
        windSpeed.innerText         = dataTransformed.wind.speed + "km/h";
        img.setAttribute('src', "http://openweathermap.org/img/wn/" + icon + "@4x.png" );
        citySearch.value ='';

   bodybackground(dayOrNight,weather);
    }, geolocationError);
}

//Appel de l'API lors du click de recherche
let majData = async (citySearch) => {
    city             = citySearch;
    let data                = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=efc0b67a43b8a0ef061f770e6ba10b53&units=metric'); //mettre la clé
    let dataTransformed     = await data.json();
    let weather             = dataTransformed.weather[0].main;
    let icon                = dataTransformed.weather[0].icon;
    let dayOrNight          = icon[2];

    cityDisplay.innerText       = dataTransformed.name;
    temp.innerText              = dataTransformed.main.temp + "°C";
    tempMin.innerText           = dataTransformed.main.temp_min + "°C";
    tempFeelsLike.innerText     = dataTransformed.main.feels_like + "°C";
    pressure.innerText          = dataTransformed.main.pressure + "Pa";
    humidity.innerText          = dataTransformed.main.humidity + "%";
    windSpeed.innerText         = dataTransformed.wind.speed + "km/h";
    img.setAttribute('src', "http://openweathermap.org/img/wn/" + icon + "@4x.png" );
    citySearch.value ='';

   bodybackground(dayOrNight,weather);
}

button.addEventListener('click', () => {
    citySearch = document.querySelector('#city-search');
    majData(citySearch.value);
} );

form.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        citySearch = document.querySelector('#city-search');
        majData(citySearch.value);
    }
});