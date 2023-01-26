// Récupérer tous les éléments du DOM modifiables
let city            = document.querySelector('#city');
let temp            = document.querySelector('#temp');
let tempMin         = document.querySelector('#temp-min');
let tempFeelsLike   = document.querySelector('#feels-like');
let pressure        = document.querySelector('#pressure');
let humidity        = document.querySelector('#humidity');
let windSpeed       = document.querySelector('#wind');


//Appel de l'API
let majData = async () => {
    let data = await fetch('https://api.openweathermap.org/data/2.5/weather?q=toulouse&appid=efc0b67a43b8a0ef061f770e6ba10b53&units=metric');
    let dataTransformed = await data.json();
    temp.innerText              = dataTransformed.main.temp+"°C";
    tempMin.innerText           = dataTransformed.main.temp_min;
    tempFeelsLike.innerText     = dataTransformed.main.feels_like;
    pressure.innerText          = dataTransformed.main.pressure;
    humidity.innerText          = dataTransformed.main.humidity;
    windSpeed.innerText         = dataTransformed.wind.speed;
}

majData();