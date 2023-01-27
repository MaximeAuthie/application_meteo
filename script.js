// Récupérer tous les éléments du DOM modifiables
let citySearch      = 'Toulouse';
let cityDisplay     = document.querySelector('#city-display');
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

    cityDisplay.innerText       = dataTransformed.name;
    temp.innerText              = dataTransformed.main.temp + "°C";
    tempMin.innerText           = dataTransformed.main.temp_min + "°C";
    tempFeelsLike.innerText     = dataTransformed.main.feels_like + "°C";
    pressure.innerText          = dataTransformed.main.pressure + "Pa";
    humidity.innerText          = dataTransformed.main.humidity + "%";
    windSpeed.innerText         = dataTransformed.wind.speed;
    citySearch.value ='';

    if (weather=="Clear") {
        document.body.style.backgroundImage = 'url("medias/day/clear.jpg")';
    }
}


button.addEventListener('click', majData);