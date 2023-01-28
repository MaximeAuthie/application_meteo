// Récupérer tous les éléments du DOM modifiables
let citySearch      = 'Toulouse';
let cityDisplay     = document.querySelector('#city-display');
let img             = document.querySelector('#icon');
let temp            = document.querySelector('#temp');
let tempMin         = document.querySelector('#temp-min');
let tempFeelsLike   = document.querySelector('#feels-like');
let pressure        = document.querySelector('#pressure');
let humidity        = document.querySelector('#humidity');
let windSpeed       = document.querySelector('#wind');
let button          = document.querySelector('#magnifying-glass');

//Appel de l'API
let majData = async () => {
    citySearch              = document.querySelector('#city-search');
    let data                = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + citySearch.value + '&appid=&units=metric'); //mettre la clé
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


button.addEventListener('click', majData);