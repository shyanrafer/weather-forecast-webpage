# weather-forecast-webpage

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

Major help and inspiration from... https://www.youtube.com/watch?v=74IOjtVvExY
https://github.com/devression/WeatherApplication/blob/main/script.js - script inspiration
openweathermap provided loads of insight on calling weather data as well as manipulating the url for various needs such as:
- converting simple input into geo coordinates
- current weather call
- forecast call
- icon call

This challenge was lovely in that it made me really think out the layout of the functions on my JavaScript page. With the
last assignment, we were provided a template of functions and by the names one could deduce what contents to fill the 
function with. For this challenge, that wasn't the case. We had to build the website from scratch. Initially I launched 
into the site build with a certain direction in mind but after seeing the video listed above I changed up my html and 
subsequent JavaScript approach. Also, for this portion, I worried most about function. The layout isn't exactly like the 
model provided, but positioning of elements is still something I am coming to terms with. I provided styling both via 
JavaScript as well as with CSS. Local storage was utilized to store past searches and then also reapply past searches by 
resubmitting them through the fetchLocationData and subsequent functions.

Deployed link: https://shyanrafer.github.io/weather-forecast-webpage/
Github repo: https://github.com/shyanrafer/weather-forecast-webpage

Webpage screenshot
https://github.com/shyanrafer/weather-forecast-webpage/blob/main/assets/Screenshot%202024-06-10%20at%201.52.06%E2%80%AFPM.png