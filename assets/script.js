// the goal is to gather the water after clicking submit
function getWeather() {
  // First step is to set a variable equal to the API key so it can be easily called later and to gather the value of the location search
  const apiKey = 'e457d72bba6b076b0b9da86c064c1aa5';
  const locationSearch = document.getElementById('location-search').value;
  
  // Ensures a location input is provided
  if (!locationSearch) {
    alert('Please enter a city');
    return;   
  }
  
  // A function to use the simple location and apiKey to generate a lat and longitude value and return 1 item
  const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${locationSearch}&limit=1&appid=${apiKey}`;
  
  fetch(geocodingUrl)
  // Converts the response to JSON
  .then(response => response.json())
  .then(geoData => {
    // Ensure valid input
    if (!geoData.length) {
      alert('Location not found');
      return;
    }
    // Uses specific data from the gathered data
    const lat = geoData[0].lat;
    const lon = geoData[0].lon;
    
      // Uses the gathered data to generate a URL
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;      
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    
      fetch(currentWeatherUrl)
          .then(response => response.json())
          .then(data => {
              displayWeather(data);
          })
          .catch(error => {
              console.error('Error fetching current weather data:', error);
              alert('Error fetching current weather data. Please try again.');
          });
    
      fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
          displayHourlyForecast(data.list);
        })
        .catch(error => {
          console.error('Error fetching hourly forecast data:', error);
          alert('Error fetching hourly forecast data. Please try again later.');
        });
    })
    .catch(error => {
      console.error('Error fetching geolocation data:', error);
      alert('Error fetching geolocation data. Please try again later.');
    });
}
