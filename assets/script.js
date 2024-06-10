// global setting of api key so it can be accessed everywhere
const apiKey = 'e457d72bba6b076b0b9da86c064c1aa5';
// creating an empty array for past searches
let pastSearches = JSON.parse(sessionStorage.getItem('pastSearches')) || [];
// once page is loaded either presents empty past searches or up to 5 past searches from the 'current session' history
document.addEventListener('DOMContentLoaded', () => {
  updatePastSearches();
});

// forst we ensure a search input is provided
function getWeather() {
  const locationSearch = document.getElementById('location-search').value;
  
  if (!locationSearch) {
    alert('Please enter a city');
    return;   
  }
  // once a viable input has been provided we run the fetch location data
  fetchLocationData(locationSearch);
}

// the previously searched location is the parameter for this fx
function fetchLocationData(locationSearch) {
  // we need location data before being able to display anything
  const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${locationSearch}&limit=1&appid=${apiKey}`;
  
  fetch(geocodingUrl)
    .then(response => {
      // ensures a 200 response
      if (!response.ok) {
        // otherwise alerts
        alert(`Error fetching geolocation data: ${response.statusText}`);
      }
      return response.json();
    })
    .then(geoData => {
      //  ensures the location has data otherwise returns error
      if (!geoData.length) {
        alert('Location not found');
        return;
      }
      
      // sets a variable by pulling specific data from the geoData response
      const lat = geoData[0].lat;
      const lon = geoData[0].lon;
      
      // passing lat and lon into the following functions here
      fetchCurrentWeatherData(lat, lon);
      fetchForecastData(lat, lon);
      // and passing in the locationSearch data into past search
      addPastSearch(locationSearch);
    })
    // if error alerts user
    .catch(error => {
      console.error(error);
      alert('Error fetching geolocation data. Please try again later.');
    });
}


// quick function to gather the current forecast data - passes lat and lon through
function fetchCurrentWeatherData(lat, lon) {
  // class provided: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  
  fetch(currentWeatherUrl)
    .then(response => {
      if (!response.ok) {
        alert(`Error fetching current weather data: ${response.statusText}`);
      }
      return response.json();
    })
    // after data is interpreted from the browser we call the displayCurrentWeather fx and add the called data as a parameter here
    .then(data => {
      displayCurrentWeather(data);
    })
    .catch(error => {
      console.error(error);
      alert('Error fetching current weather data. Please try again.');
    });
}


// quick function to gather the 5 day forecast data - passes lat and lon through
function fetchForecastData(lat, lon) {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  
  fetch(forecastUrl)
    .then(response => {
      if (!response.ok) {
        alert(`Error fetching forecast data: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      // after data is interpreted from the browser we call the displayForecast fx and add the called data as a parameter here
      displayForecast(data.list);
    })
    .catch(error => {
      console.error(error);
      alert('Error fetching forecast data. Please try again later.');
    });
}


// data in this fx is gathered from initial search being turned into lat and lon coordinates that was then passed through a fetch location data fx.
function displayCurrentWeather(data) {
  const weatherContent = document.getElementById('current-weather-content');
  const iconCode = data.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  // gathers data and creates an element with the data per perameter as the contents
  weatherContent.innerHTML = `
  <h3>${data.name}</h3>
  <p>Temperature: ${data.main.temp.toFixed(1)}°F</p>
  <p>Weather: ${data.weather[0].description} <img src="${iconUrl}" alt="Weather icon"></p>
  <p>Humidity: ${data.main.humidity}%</p>
  <p>Wind Speed: ${data.wind.speed.toFixed(1)} mph</p> 
  `;
  // from the data, we use dot notation to select specifc data points, create elements with the corresponding data, and then add them to the DOM 
  // tofixed() selects the amount of decimals we would like in our result
  }
  

  // data in this fx is gathered from initial search being turned into lat and lon coordinates that was then passed through a fetch location data fx.
  function displayForecast(data) {
  //  connects to forecast-content on html page
  const forecastContent = document.getElementById('forecast-content');
  // initially sets forecastContent as a blank string
  forecastContent.innerHTML = '';
  
  // loops through the data - openweather provides readings every 3 hours so this will refresh 8 times per day
  for (let i = 0; i < data.length; i += 8) {
    // setting forecast to equal the iteration
    const forecast = data[i];
    // the following is a new one... date is equal to new Date(forecast.dt * 1000) as new Date() converts unix time (forecast.dt)to a readable format - the 'date' data from the forecast data fetch was in unix timecode - so we pass forecast.dt through and multiply by 1000 to get miliseconds as that is required for new Date() to work. 
    const date = new Date(forecast.dt * 1000);
    // pulls icon code from data array
    const iconCode = forecast.weather[0].icon;
    // adds icon code to url so we can all the icon as needed
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
    // sets html content
    forecastContent.innerHTML += `
      <div class="forecast-card">
        <p>Date: ${date.toDateString()}</p> 
        <p>Temperature: ${forecast.main.temp.toFixed(1)}°F</p>
        <p>Weather: ${forecast.weather[0].description} <img src="${iconUrl}" alt="Weather icon"></p>
      </div>
    `;
    // date is converted to a string with toDateString()
    // we pull temo data from the forecast array and set the output to 1 decimal place with toFixed()
    // same with weather and also the weather icon is added
  }
}

function addPastSearch(location) {
  // we want to check if there are past searches first
  if (pastSearches.includes(location)) {
    return;
  }
  // ensures no more than 5 past searches are stored at a time
  if (pastSearches.length >= 5) {
    pastSearches.shift();
  }
  // pushes search input to past searches
  pastSearches.push(location);
  // sets data and stringifies array
  sessionStorage.setItem('pastSearches', JSON.stringify(pastSearches));
  // then we want to run a function to show a clear past search portion of the document or a list 
  updatePastSearches();

}

function updatePastSearches() {
  // assigns past-search-list to pastSearchList in order to initiate DOM manipulation
  const pastSearchList = document.getElementById('past-search-list');
  // sets to empty string
  pastSearchList.innerHTML = '';
  // passes through clicked search input
  pastSearches.forEach(location => {
    // for each input the following is applied:
    const searchItem = document.createElement('li'); // makes each item part of a list 
    searchItem.textContent = location; // uses the location search input as the textContent
    searchItem.style.listStyle = 'none'; // removes bullet point
    searchItem.style.textDecoration = 'underline' // adds and underline
    searchItem.style.cursor = 'pointer'; // changes cursor to pointer when hovering over a past search item
    searchItem.addEventListener('click', () => { // adds re-search ability on click event
      // 're-inputs' the location clicked into the search field then runs fetch location data and so on thereafter
      document.getElementById('location-search').value = location;
      fetchLocationData(location);
    });
    // then the search is (re)added to the pastSearchList
    pastSearchList.appendChild(searchItem);
  });
}
