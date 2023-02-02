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

// Fonction permettant de compléter les éléments du DOM après l'appel de l'API
function fillElements (apiResponse, weather) {
    // let weather                 = apiResponse.weather[0].main;
    let weatherIcon             = apiResponse.weather[0].icon;
    let dayOrNight              = weatherIcon[2];

    cityDisplay.innerText       = apiResponse.name;
    temp.innerText              = apiResponse.main.temp + "°C";
    tempMin.innerText           = apiResponse.main.temp_min + "°C";
    tempFeelsLike.innerText     = apiResponse.main.feels_like + "°C";
    pressure.innerText          = apiResponse.main.pressure + "Pa";
    humidity.innerText          = apiResponse.main.humidity + "%";
    windSpeed.innerText         = apiResponse.wind.speed + "km/h";
    img.setAttribute('src', "http://openweathermap.org/img/wn/" + weatherIcon + "@4x.png" );
    citySearch.value ='';
    console.log('Actualisation OK');
        bodybackground(dayOrNight,weather);
}

// Fonction pour appeller l'API dans l'objectif d'actualiser les données

function callApi () {
    cityDisplay = document.querySelector('#city-display');
    majData(cityDisplay.textContent);
}

// Fonction en cas d'échec de la géolocalisation
function geolocationError () {
    citySearch = 'Paris';
    majData(citySearch);
}

// Appel de l'API en géolocalisant l'utilisateur (lattitude, longitude)
if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition( async (position) => {
        let data                = await fetch('https://api.openweathermap.org/data/2.5/weather?lon=' + position.coords.longitude + '&lat='+ position.coords.latitude + '&appid=efc0b67a43b8a0ef061f770e6ba10b53&units=metric'); //mettre la clé
        let dataTransformed     = await data.json();
        let weather             = dataTransformed.weather[0].main;

        fillElements(dataTransformed,weather);
    }, geolocationError);
}

// Appel de l'API lors du click de recherche (nom de ville)
let majData = async (citySearch) => {
    let data                = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + citySearch + '&appid=efc0b67a43b8a0ef061f770e6ba10b53&units=metric'); //mettre la clé
    let dataTransformed     = await data.json();
    let weather             = dataTransformed.weather[0].main;

    fillElements(dataTransformed,weather);
}

// Ecouteurs d'évènement

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

// Actualisation des données toutes les 10 minutes

setInterval(callApi,600000);
