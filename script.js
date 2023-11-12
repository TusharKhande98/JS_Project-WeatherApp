
const inputBox = document.querySelector('.input-box')
const searchBtn = document.getElementById('searchBtn')
const weatherImg = document.getElementById('weather-img1')
const temperature = document.querySelector('.temperature')
const description = document.querySelector('.description')
const humidity = document.getElementById('humidity')
const windSpeed = document.getElementById('wind-speed')
const locationNotFound = document.querySelector('.location-not-found')
const weatherBody = document.querySelector('.weather-body')
// we have to select whole image temperature, humidity all contents here & display ony error image



async function checkWeather(city) // value from input box will be fetch here
{
    const api_key = "8d3f0d31cacbf5d6fb5a438edc6c035a"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}` 
    // key & url copied from 'https://openweathermap.org'

    const weather_data = await fetch(`${url}`).then(response => response.json())    
    console.log(weather_data); // here we print received data
    // 1. to access weather we use 'fetch' function here
    // 2. we pass an url to fetch which will pass some data to us which is in json format as response
    // 3. that json response we convert into string using '.then()'
    // 4. using await all data we can store at 1 time in 'weather_data', it can only be used in 'async' function



    // below we avoid spell error message by getting value of 'cod' which provides error code
    if(weather_data.cod === '404')
    {
        locationNotFound.style.display = "flex"
        // in css it will be changed & image wil be displayed when error occurred
                
        weatherBody.style.display = "none"
        // if display is flex(if someone input city name) then it will be none after it
   
        console.log("Error");
        return
    }

    locationNotFound.style.display = "none"
    // if there is no error then error image changed to display none in css by js
            
    weatherBody.style.display = "flex"
    // if no error so all details from weather-body in html will be displayed & properties from css has been applied to it after flex


 
    // now below we write response data in inner html
    temperature.innerHTML =`${Math.round(weather_data.main.temp-273.15)}°C`
    // 1. we stored response in 'weather_data' from that we fetch values by print that object(we wil see how to access that based on o/p)
    // 2. it will give temperature in kelvin, we convert it into celsius by subtracting '273.15 from its value 
    // 3. after convert we make it as round figure

    // below we change remaining values of weather details same as above
    description.innerHTML = `${weather_data.weather[0].description}`
    // access element from 0th index from weather

    humidity.innerHTML = `${weather_data.main.humidity}%`  // here we access humidity
    windSpeed.innerHTML = `${weather_data.wind.speed}Km/Hr`  // here we access wind

    console.log(weather_data.weather[0].main);
    // to change image according to weather we add switch case here & pass value as weather's description from api
    switch(weather_data.weather[0].main)
    {
        case 'Clouds':
            weatherImg.src = "/assets/cloud.png";
            break;
        case 'Clear':
            weatherImg.src = "/assets/clear.png";
            break;
        case 'Rain':
            weatherImg.src = "/assets/rain.png";
            break;
        case 'Mist':
            weatherImg.src = "/assets/mist.png";
            break;
        case 'Snow':
            weatherImg.src = "/assets/snow.png";
            break;
    }





}


// below we add 'event listener of click' on clicking search button
searchBtn.addEventListener('click', () => {
    
    checkWeather(inputBox.value) 

    // when we click search button 'checkWeather' function will be called
    // which access value from inputBox from html


    

})











